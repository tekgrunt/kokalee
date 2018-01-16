# kokalee-frontend

> A Vue.js project

See https://github.com/Microsoft/TypeScript-Vue-Starter for info on getting started with vue + typescript

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# lint the Typescript
npm run lint

# run the tests
npm test

# run the tests on changes
npm run test:watch

# run the test suite and generate a coverage report
npm run coverage

# run the tests on Teamcity
npm run ci:teamcity

# run the tests on Jenkins
npm run ci:jenkins

# build for production with minification
npm run build

# clean the production build
npm run clean

# check for updates, unused dependencies
npx npm-check
```
This is the web client for the Kokalee project.

We are using a variety of technologies to make this all work.

Hoodie: http://hood.ie/
Vue: https://vuejs.org/
Webpack: https://webpack.js.org/
TypeScript: https://www.typescriptlang.org/
Sass: http://sass-lang.com/
And more!

The list is long but I think those are the main things to be aware of
before jumping into the project. Hoodie is probably the technology that will
seem the most foreign and it is not a bad idea to go read about it, progressive
web apps in general and PouchDB & CouchDB (all of this is used to create the
"offline first" paradigm we are trying to subscribe to).

hoodie store documentation:
https://github.com/hoodiehq/hoodie-store-client

There is more but that is it for now... feel free to add to this file if you
see something that is missing and that needs to be included :)
