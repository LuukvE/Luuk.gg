# A Good App

## __Features__
- Built on top of [HTML 5](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS 3](https://developer.mozilla.org/en-US/docs/Web/CSS) _(SCSS)_ and [Javascript ES6](https://developer.mozilla.org/en-US/docs/Web/Javascript) _(latest)_
- Built using [React 16](https://reactjs.org/docs/react-api.html) _(latest)_
- `/package.json` enables CLI commands through [Yarn](https://yarnpkg.com/lang/en/)
- `/routes.json` defines the sitemap and resources required to load each view
- `/tools` contains generalized components and logic
- `/dist` used to save a build

## __Setup__
* Execute `yarn` to install dependencies
* Execute `yarn start` to do localhost development

## __Deployment__
* Create `config.json`, it should never be commited and therefore is added to `.gitignore`
* Execute `yarn build` to create a build in `/dist` add `--debug` to keep sourcemaps and console logs
* Execute `yarn deploy <stage>` to upload `/dist` the to an [AWS S3](https://aws.amazon.com/s3/) bucket

## __Changelog__
Tracks the changes between every deployment to production stage

### 0.0.1 patch release (7 november 2019)
* Change: Updated README

### 0.0.0 major release (22 october 2019)
* Feature: Basic file structure and React boilerplate

## __Proposals__
Tracks ideas awaiting concensus

### Hardcore Single Page App
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
