# kokalee-frontend

> A Vue.js project

See https://github.com/Microsoft/TypeScript-Vue-Starter for info on getting started with vue + typescript

## Description

This is the web client for the Kokalee project.

We are using a variety of technologies to make this all work.

Hoodie: http://hood.ie/
Vue: https://vuejs.org/
Webpack: https://webpack.js.org/
TypeScript: https://www.typescriptlang.org/
Sass: http://sass-lang.com/
CouchDB: https://couchdb.apache.org/
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

## Development Setup

First, install all Node.js dependencies:

```bash
npm install
```

Next, build the hoodie-plugin-rocket.chat project

```bash
npm run predev
```

Finally, launch the app in development mode with live reload:

```bash
npm run dev
```

Additional commands:

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

## Database Configuration

By default, Hoodie will store data in the local file system using PouchDB (i.e. in the `.hoodie/data` directory. To hook
it up to a real CouchDB instance, you need to create a JSON-formatted `.hoodierc` file in the current directory. Consult
Hoodie's official [Configuration](http://docs.hood.ie/en/latest/guides/configuration.html) documentation to learn about
the options available. To get started quickly, copy the contents of `.hoodierc-example.json` to `.hoodierc` and adjust
the options there to match your own environment.

**NOTE**: The `.hoodierc` file should never be committed to version control since it contains configuration specific to
your local environment.

Ensure that an empty database matching the name specified in the `dbUrl` configuration option already exists in CouchDB.

Bear in mind that the user specified by the `dbUrlUsername` and `dbUrlPassword` configuration options must be a CouchDB
[administrator](http://docs.couchdb.org/en/latest/config/auth.html#server-administrators) user so that Hoodie can create
its own databases for managing authentication/authorization and various other metadata. See Hoodie's
[documentation](http://docs.hood.ie/en/latest/guides/deployment.html#couchdb) on deploying with CouchDB for more
information.

The documentation on [How Hoodie Works](http://docs.hood.ie/en/latest/about/how-hoodie-works.html) may also be helpful
in understanding how Hoodie interacts with CouchDB.

See [Set up CouchDB on Raspberry Pi](https://github.com/tekgrunt/kokalee/wiki/Set-up-CouchDB-on-Raspberry-Pi) in the
project's wiki for information specifically on installing and configuring CouchDB on Raspberry Pi hardware.
