# Luuk.gg

Boilerplate for professional web development. Built on top of [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) and [Javascript ES6](https://developer.mozilla.org/en-US/docs/Web/Javascript) using [React 16](https://reactjs.org/docs/react-api.html)

## **Setup**

- Install dependencies: `npm install` or `yarn`
- Localhost development: `npm run-script start` or `yarn start`

## **Roadmap**

Tracks the changes between every deployment and each future versions

### **1.1.0 future release (january 2020)**

- Feature: Offline application support
  - Memory syncing with `indexedDB` on the client-side
  - HTML5 manifest file
- Feature: Deployment automation
  - S3 AWS deploy to bucket
  - Bugsnag upload sourcemap

### **1.0.0 future release (december 2019)**

- Feature: Extra components
  - Graphs
  - Inputs
    - Currency
    - Color
    - Range
    - Drag and drop
    - Date _(+ range)_
    - HTML _(+ editable preview)_
    - File _(+ progress bar)_
    - Image _(+ cropping)_
  - Tooltips
  - Popovers
- Feature: Forms
  - Bi-directional inputs for any text or file
  - Validation and error messaging
  - Multi-step indicators and subflows
  - Remembers input if the browsers closes during form fill-out
- Feature: Create and delete data records
- Feature: Multilingual support
  - Datetime, relative time or durations through `moment.js`
  - Language-specific builds are made with `webpack` compiler
- Feature: Google Analytics

### **0.1.5 patch release (16 november 2019)**

- Feature: Added games, tournaments, stages, matches data
- Feature: Generalized the list component
- Feature: Updated UI styling

### **0.1.4 patch release (15 november 2019)**

- Feature: Added side and top bars
- Feature: Added Home and About page
- Feature: Added Google Analytics tracking code

### **0.1.3 patch release (9 november 2019)**

- Change: Updated README
- Change: Removed all previous boilerplate code
- Feature: Added new default components
- Feature: Reconfigured Webpack

### **0.1.2 patch release (8 november 2019)**

- Change: Updated README

### **0.1.1 patch release (7 november 2019)**

- Change: Updated README

### **0.1.0 major release (22 october 2019)**

- Feature: Basic file structure and React boilerplate
- Feature: Webpack
