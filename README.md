# __Tournament App__
_Hi! Luuk here. I quickly built this app in < 6 hours, feel free to check the source_

## __Setup__
* Execute `yarn` to install dependencies
* Execute `yarn start` to view my work

## __Decisions__
- I wrote it with React because most organisations prefer this framework.
- I used `react-static-boilerplate` to get started quickly.
  - Hot reloading; good to have when creating and styling components
  - `package.json` scripts; quickly allows me to `yarn start` and `yarn build`
  - `routes.json` definition; provides clarity
- I had to remove and clean up unneccesary features of the development environment; less code allows for the most enjoyable way to create sofware
- I downloaded fake JSON data from Github and placed it in `/public/data.json`, realistically this would be a request to an API, so I am treating it as a dynamically updated dataset that I would need to fetch again on navigation to stay up-to-date. For true real-time apps I would use an API with websocket support.
- I removed `react-mdl` and added `css-reset-and-normalize`; Material Design adds excessive amounts of classes and options that I do not think I require in a use case like this one. I just need to make sure all browsers are supported.
- The app can be used on desktop and mobile devices. The filters are as simple as I could make them to increase the usability for handheld users.


## __Task__
Build a simple Javascript application that consumes `data.json`.

### __List Tournament View__

Filter the list by:
- series
- start dates
- end dates

### __Detail Tournament View__

Display Tournament and Series details
