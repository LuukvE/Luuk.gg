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

- Feature: Components
  - Buttons
  - Graphs
  - Inputs
    - Text
    - Number
    - Select
    - Datalist
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
- Feature: Pages
  - Interface components to create, update and delete data records
  - Lists able to filter, loading / empty states, pagination, sorting
- Feature: Forms
  - Bi-directional inputs for any text or file
  - Validation and error messaging
  - Multi-step indicators and subflows
  - Remembers input if the browsers closes during form fill-out
- Feature: Multilingual support
  - Datetime, relative time or durations through `moment.js`
  - Language-specific builds are made with `webpack` compiler
- Feature: Single application router for multiple domains
  - Dynamic CSS loading
  - Dynamic JS loading
  - A single app; no duplicate code
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

## **Proposals**

Tracks ideas awaiting concensus

### **Singular Application Router**

**How can we improve our development speed?**

- Less complexity throughout every aspect of all projects
- Less work lost to non-creative development operations
- Less lines of code

**How do we achieve these results?**

- Point all DNS records to the production AWS S3 bucket hosting this web application
- Create a single router that responds differently based on the entire URL including domain name

**What are the upsides?**

- Less complexity within both project management and software development
- Creates a clear flow within client-side development _(pull requests, branches, issue tracking)_
- Avoids having to separate out _"core"_ modules and upgrading them within multiple repositories
- Single piece of documentation making it hard to miss
- Easier to automate development operations

### **Instant Application Startup**

**What can we do to load the application as fast as possible?**

- Deploy all static files to a CDN like AWS S3 to make sure end-users are physically closer to the data containing this software and the configuration and resources required to load it
- Use an HTML5 application cache to cache all static files using a manifest file
- Store all data received from APIs in a client-side database like IndexedDB. The app shows previously loaded data immediatly without having to wait for any API network traffic. Use an `updated` property on each memory object. So it becomes trivial to update the interface in realtime after the first load.
