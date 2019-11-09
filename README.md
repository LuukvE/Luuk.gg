# Professional Web Application
Built on top of [HTML 5](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS 3](https://developer.mozilla.org/en-US/docs/Web/CSS) _(SCSS)_ and [Javascript ES6](https://developer.mozilla.org/en-US/docs/Web/Javascript) using [React 16](https://reactjs.org/docs/react-api.html)

## __Setup__
- Install dependencies: `npm install` or `yarn`
- Localhost development: `npm run-script start` or `yarn start`

## __Deployment__
- Create `config.json`, it should never be commited and therefore is added to `.gitignore`
- Execute `yarn build` to create a build
- Execute `yarn deploy <stage>` to upload `/dist` the to an [AWS S3](https://aws.amazon.com/s3/) bucket

## __Roadmap__
Tracks the changes between every deployment and each future version

### __1.1.0 future release (january 2020)__
- Feature: Offline application support
  - Memory syncing with `indexedDB` on the client-side
  - HTML5 manifest file
- Feature: Deployment automation
  - S3 AWS deploy to bucket
  - Bugsnag upload sourcemap

### __1.0.0 future release (december 2019)__
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

### __0.1.3 patch release (9 november 2019)__
- Change: Updated README
- Change: Removed all previous boilerplate code
- Feature: Added new default components
- Feature: Reconfigured Webpack

### __0.1.2 patch release (8 november 2019)__
- Change: Updated README

### __0.1.1 patch release (7 november 2019)__
- Change: Updated README

### __0.1.0 major release (22 october 2019)__
- Feature: Basic file structure and React boilerplate
- Feature: Webpack

## __Proposals__
Tracks ideas awaiting concensus

### __Singular Application Router__
__How can we improve our development speed?__
- Less complexity throughout every aspect of all projects
- Less work lost to non-creative development operations
- Less lines of code

__How do we achieve these results?__
- Point all DNS records to the production AWS S3 bucket hosting this web application
- Create a single router that responds differently based on the entire URL including domain name

__What are the upsides?__
- Less complexity within both project management and software development
- Creates a clear flow within client-side development _(pull requests, branches, issue tracking)_
- Avoids having to separate out _"core"_ modules and upgrading them within multiple repositories
- Single piece of documentation making it hard to miss
- Easier to automate development operations

### __Instant Application Startup__
__What can we do to load the application as fast as possible?__
- Deploy all static files to a CDN like AWS S3 to make sure end-users are physically closer to the data containing this software and the configuration and resources required to load it
- Use an HTML5 application cache to cache all static files using a manifest file
- Store all data received from APIs in a client-side database like IndexedDB. The app shows previously loaded data immediatly without having to wait for any API network traffic. Use an `updated` property on each memory object. So it becomes trivial to update the interface in realtime after the first load.
