# hoodie-plugin-rocket.chat

> A hoodie plugin for iframe auth in Rocket.Chat

This Hoodie plugin is a great starting point if you want to create an own Hoodie
plugin. It extends the `hoodie` client API, it defines a server route and a UI
which can be accessed at `/hoodie/hello-world`.

## Usage

First, install the plugin as dependency of your Hoodie app

```js
npm install --save hoodie-plugin-rocket.chat
```

Then add it the `hoodie.plugins` array in your app’s `package.json` file.
Here, you can specify the location of the rocket.chat server
`hoodie.app.rocketChat.rootUrl`, and the connection string for its mongodb.

```json
{
  "name": "your-hoodie-app",
  ...
  "hoodie": {
    "plugins": ["hoodie-plugin-rocket.chat"],
    "app": {
      "rocketChat": {
        "rootUrl": "http://localhost:3000",
        "mongoUrl": "mongodb://localhost:3001"
      }
    }
  }
}
```

Next, in Rocket.Chat, as an admin, go to ... -> Administration -> Settings -> Accounts -> Iframe
**NOTE:** change `localhost:8080` as appropriate for your deployment.

* "Enabled" - select `True`
* "Iframe URL" - `http://localhost:8080/hoodie/rocket.chat`
* "API URL" - `http://localhost:8080/hoodie/rocket.chat/api/auth`
* "Api Method" - `GET`

You can now start your app with `npm start` and access the hello world form
at [localhost:8080/hoodie/rocket.chat](http://localhost:8080/hoodie/rocket.chat).

## Local setup

This plugin has `hoodie` as devDependency. The idea is that plugins can be
started just like apps. Simply `git clone` this repository, run `npm install`
and then `npm start`.

## License

[Apache 2.0](LICENSE)
