
import * as pkg from '../package.json'
import {Server, PluginAttributes} from 'hapi';

export interface PluginOptions {
  app: any
}

export function register(server: Server, options: PluginOptions, next: (err?: Error) => void): void {
  const defaults = options.app.rocketChat || {}

  server.route({
    method: 'POST',
    path: '/api',
    handler: function (request, reply) {
      const options = request.payload

      // TODO: return 401 if not logged in

      // TODO: get session token and user info from hoodie

      // TODO: get user from hoodie internals using mongodb and set the user's `services.iframe.token`
      // lookup via username, create if not exists

      reply(null, {
        token: 'TODO: TOKEN'
      }).code(201)
    }
  })

  next()
}

export namespace register {
  export const attributes: PluginAttributes = {pkg}
}