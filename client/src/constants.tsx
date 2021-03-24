import { Marker, Recipe } from './types';

// Messenger page
export const userArrived = '<@U01RYFCUJ9H>: User arrived on the page';

export const userLeft = '<@U01RYFCUJ9H>: User left the page';

// Career page
export const markers: Marker[] = [
  {
    title: 'Bayes E-Sport Solutions',
    position: { lat: 52.5101722600148, lng: 13.401322741873111 },
    content: `<div class="content">
      <h4>Bayes E-Sports Solutions</h4>
      <h5>Lead TypeScript Developer</h5>
      <div class="sub"><span>Berlin</span> January 2020 - Current</div>
      <p>I lead the development of applications that manage and visualise esports-related data.</p>
      <div><b>TypeScript</b> <b>React</b> <b>SCSS</b> <b>HTML</b></div>
    </div>`
  },
  {
    title: 'Fearless Apps',
    position: { lat: 51.924440486528425, lng: 4.477718813659339 },
    content: `<div class="content">
      <h4>Fearless Apps</h4>
      <h5>TypeScript Developer and Co-Owner</h5>
      <div class="sub"><span>Rotterdam</span> July 2017 - Current</div>
      <p>My brother and I build high performance, data-rich applications by using cutting edge web technologies.</p>
      <div><b>JavaScript</b> <b>React</b> <b>React Native</b> <b>NodeJS</b> <b>MongoDB</b> <b>SCSS</b> <b>HTML</b></div>
    </div>`
  },
  {
    title: 'SkillsTown',
    position: { lat: 51.44449613801224, lng: 5.474178762822659 },
    content: `<div class="content">
      <h4>SkillsTown</h4>
      <h5>Web Application Developer</h5>
      <div class="sub"><span>Eindhoven</span> May 2019 - December 2019</div>
      <p>I created software and provided support for all SkillsTown IT services. I was the lead developer in four major projects: Video Feedback Pro, Essential Editor, Skin Editor and Request for Change.</p>
      <div><b>JavaScript</b> <b>Svelte</b> <b>PHP</b> <b>SQL</b> <b>NoSQL</b> <b>SCSS</b> <b>HTML</b></div>
    </div>`
  },
  {
    title: 'De Nationale Hypotheekbond',
    position: { lat: 52.324694976902215, lng: 4.953558104788068 },
    content: `<div class="content">
      <h4>De Nationale Hypotheekbond</h4>
      <h5>Web Application Developer</h5>
      <div class="sub"><span>Amsterdam</span> August 2018 - March 2019</div>
      <p>I set up a new React-based application stack and implemented it in six calculation tools used by both customers and professionals.</p>
      <div><b>JavaScript</b> <b>React</b> <b>SCSS</b> <b>HTML</b></div>
    </div>`
  },
  {
    title: 'Software Skills',
    position: { lat: 57.70624580247781, lng: 11.973183906521754 },
    content: `<div class="content">
      <h4>Software Skills</h4>
      <h5>Web Application Developer</h5>
      <div class="sub"><span>Gothenburg</span> September 2015 - July 2017</div>
      <p>I maintained and improved multiple modern web applications that provide services to customers and test candidates. I did full stack development on all applications the company owns and runs.</p>
      <div><b>JavaScript</b> <b>AngularJS</b> <b>NodeJS</b> <b>MongoDB</b> <b>MySQL</b> <b>SCSS</b> <b>HTML</b></div>
    </div>`
  },
  {
    title: 'Bullingdon Research Limited',
    position: { lat: 51.53937117655123, lng: -0.1497240397359964 },
    content: `<div class="content">
      <h4>Bullingdon Research Limited</h4>
      <h5>Front-End Developer</h5>
      <div class="sub"><span>London</span> April 2012 - September 2012</div>
      <p>Bullingdon Research created a data-visualisation app for finance experts which consists of 27 pages, 9 page types. It uses multiple HTML5 features and an incredible design.</p>
      <div><b>JavaScript</b> <b>BackboneJS</b> <b>NodeJS</b> <b>SCSS</b> <b>HTML</b></div>
    </div>`
  },
  {
    title: 'Dutch Didit',
    position: { lat: 52.27894337089385, lng: 5.164929035341137 },
    content: `<div class="content">
      <h4>Dutch Didit</h4>
      <h5>Front-End Developer</h5>
      <div class="sub"><span>Bussum</span> July 2011 - April 2012</div>
      <p>Dutch Didit created a predication game, with leader boards, monthly prizes, score calculations, questions and answers, account system and it supports multiple languages. This app was later sold to a leading Dutch news paper.</p>
      <div><b>JavaScript</b> <b>CSS</b> <b>HTML</b></div>
    </div>`
  },
  {
    title: 'Strait Solutions',
    position: { lat: 51.90343336211668, lng: 4.349339392447792 },
    content: `<div class="content">
      <h4>Strait Solutions</h4>
      <h5>Front-End Developer</h5>
      <div class="sub"><span>Rotterdam</span> May 2010 - August 2010</div>
      <p>Strait Solutions developed websites, designs and campaigns for customers.</p>
      <div><b>JavaScript</b> <b>CSS</b> <b>HTML</b></div>
    </div>`
  },
  {
    title: 'Self-Employed',
    position: { lat: 51.82482446611012, lng: 4.654893816741138 },
    content: `<div class="content">
      <h4>Self-Employed</h4>
      <h5>The Boy That Builds Websites</h5>
      <div class="sub"><span>Zwijndrecht</span> May 2007 - November 2009</div>
      <p>I founded Lukosite in order to practise my skills on real projects.</p>
      <div><b>JavaScript</b> <b>CSS</b> <b>HTML</b></div>
    </div>`
  }
];

// Cooking page
export const defaultRecipes: Recipe[] = [
  {
    name: 'Pasta in Tomatosauce',
    creator: '',
    difficulty: 1,
    duration: '10 min',
    image: '/pasta_tomatosauce.jpg',
    text: `## Ingredients
- Pasta
- Tomato passata *(70%)*
- Cream *(30%)*
- Garlic powder
- Paprika powder
- White pepper
- Salt
- Sugar
- Vegetable bouillon

## Instructions
1. Boil the pasta, add a large amount of salt
2. Heat everything except the passata and pasta in a pan
3. After the cream is boiling, add passata and stir
4. When the pasta done, drain and add it to the pan`
  },
  {
    name: 'Roasted Potatoes',
    creator: '',
    difficulty: 1,
    duration: '70 min',
    image: '/potatoes.jpg',
    text: `## Ingredients
- Potatoes *(~6 large potatoes per person)*
- Baking powder
- Oil
- Salt
- Favourite sauce *(Béarnaise / Mayonaisse)*

## Instructions
1. Peel your potatoes *(optional)* and cut in equal sizes
2. Boil water with lots of salt and half a teaspoon of baking powder
3. Boil your potatoes for 20 minutes just to soften
4. Preheat your oven to 250 degrees
5. Drain and rest the potatoes until no longer steaming
6. Spread your potatoes on a tray and cover them in oil
7. After roasting 20 minutes, keep roasting but turn the potatoes every 10 minutes for another 20 minutes
8. Salt your potatoes and serve with sauce`
  }
];
