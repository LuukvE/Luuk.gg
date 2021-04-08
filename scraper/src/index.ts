import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import progress from 'cli-progress';
import dotenv from 'dotenv';

import { Product, Category, Restaurant } from './schemas';

dotenv.config();

mongoose.set('useNewUrlParser', true);

mongoose.set('useFindAndModify', false);

mongoose.set('useCreateIndex', true);

mongoose.set('useUnifiedTopology', true);

mongoose.connection.on('error', (err) => console.error('MongoDB Error', err));

mongoose.connect(`mongodb://localhost/${process.env.MONGODB}`).then(() => {
  scrape(process.env.DOMAIN, process.env.URL_PATH);
});

async function scrape(domain: string, path: string) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1600, height: 800 });
  await page.goto(`${domain}${path}`);
  await page.waitForFunction('window.restaurants !== undefined');
  await new Promise((resolve) => setTimeout(resolve, 20000)); // Set geolocation manually

  const restaurants = await page.evaluate(() => {
    const properties = Object.keys(window)
      .filter((prop) => /^[A-Z_]+$/g.test(prop))
      .reduce((constants, prop) => {
        if (typeof window[prop] !== 'number') return constants;

        constants[window[prop]] = `${prop}`.toLowerCase();

        return constants;
      }, new Array(39).fill(null));

    const restaurants = window['restaurants'].reduce((restaurants, r) => {
      const restaurant = Object.keys(r).reduce((restaurant, prop) => {
        if (!properties[prop]) return restaurant;

        restaurant[properties[prop]] = r[prop];

        return restaurant;
      }, {});

      restaurants.push(restaurant);

      return restaurants;
    }, []);

    return restaurants;
  });

  const bar = new progress.SingleBar({}, progress.Presets.shades_classic);

  const total = restaurants.length;

  bar.start(total, 0);

  await (async function loop() {
    if (!restaurants.length) {
      bar.stop();

      browser.close();

      mongoose.connection.close();

      return;
    }

    const restaurant = restaurants.pop();

    bar.update(total - restaurants.length);

    const { url, branch, logo, categories } = restaurant.restaurant_info_and_links;

    delete restaurant.restaurant_info_and_links;

    restaurant.url = `${domain}${url}`;

    restaurant.branch = branch;

    restaurant.logo = logo;

    restaurant.description = categories;

    await page.goto(restaurant.url);

    const additionalInfo = JSON.parse(
      await page.evaluate(
        () => document.querySelector('script[type="application/ld+json"]')?.innerHTML || '{}'
      )
    );

    const currentRestaurant = await page.evaluate(() => window['currentRestaurant']);

    const completeRestaurant = {
      ...restaurant,
      ...Object.keys(currentRestaurant).reduce((restaurant, key) => {
        if (['Times', 'Urls', 'Translations', 'Locations', 'Polygons'].includes(key)) {
          return restaurant;
        }

        restaurant[key[0].toLowerCase() + key.substring(1)] = currentRestaurant[key];

        return restaurant;
      }, {}),
      address: additionalInfo.address,
      aggregateRating: additionalInfo.aggregateRating,
      geo: additionalInfo.geo,
      image: additionalInfo.image
    };

    Restaurant.findOneAndUpdate(
      {
        id: completeRestaurant.id
      },
      {
        $set: completeRestaurant
      },
      {
        upsert: true,
        useFindAndModify: false
      },
      async (err) => {
        if (err) throw err;

        const categories = await page.evaluate(() =>
          [].reduce.call(
            document.querySelectorAll('[data-category]'),
            (categories, domNode) => {
              const id = domNode.getAttribute('data-category');
              const name = domNode.textContent;

              if (id && name && id !== '0') {
                categories.push({
                  id,
                  name
                });
              }

              return categories;
            },
            []
          )
        );

        const promises = categories.map(
          (category) =>
            new Promise((resolve) =>
              Category.findOneAndUpdate(
                {
                  id: category.id
                },
                {
                  $set: {
                    ...category,
                    restaurant: completeRestaurant.id
                  }
                },
                {
                  upsert: true,
                  useFindAndModify: false
                },
                (err) => {
                  if (err) console.log(err);

                  resolve(null);
                }
              )
            )
        );

        const products = await page.evaluate(() =>
          window['MenucardProducts'].map((p) => {
            const {
              productId,
              name,
              categoryId,
              deliverymethod,
              hasSizes,
              is_meal,
              price,
              price_pickup
            } = p;
            const description =
              document.querySelector(`[id="${productId}"] .meal__description-additional-info`)
                ?.textContent || '';
            const options =
              document.querySelector(`[id="${productId}"] .meal__description-choose-from`)
                ?.textContent || '';

            return {
              id: productId,
              description,
              options,
              name,
              categoryId,
              deliverymethod,
              hasSizes,
              is_meal,
              price,
              price_pickup
            };
          }, [])
        );

        products.forEach((product) => {
          promises.push(
            new Promise((resolve) =>
              Product.findOneAndUpdate(
                {
                  id: product.id
                },
                {
                  $set: {
                    ...product,
                    restaurant: completeRestaurant.id
                  }
                },
                {
                  upsert: true,
                  useFindAndModify: false
                },
                (err) => {
                  resolve(null);
                }
              )
            )
          );
        });

        await Promise.all(promises);

        loop();
      }
    );
  })();
}
