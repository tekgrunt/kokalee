
import * as pkg from '../package.json'
import {Server, PluginAttributes, Request} from 'hapi';

import {MongoClient} from 'mongodb'

export interface HoodieOptions {
  app: {
    rocketChat?: PluginOptions
  }
}

export interface PluginOptions {
  rootUrl?: string
  mongoUrl?: string
}

export interface HoodieAccountsPlugin {
  api: HoodieAccountsServerApi
}
export interface SessionProperties {
  id: string
  account: {
    id: string
    username: string
    profile?: AccountProfile
  }
}
export interface AccountProperties {
  id: string
  username: string
  createdAt: string
  updatedAt: string
  profile?: AccountProfile
}
export interface AccountProfile {
  [prop: string]: string
  fullname: string
}

export interface JsonApiCollectionOptions {
  sort: string
  fields: {[type: string]: string}
  page: {offset: number, limit: number}
}

export type IdOrObject = string | {id?: string, username?: string, token?: string}

// TODO: submit to DefinitelyTyped
export interface HoodieAccountsServerApi {
  sessions: {
    add(options: {
      account: {
        username: string
        password?: string
      } | {
        token: string
      }
      timeout?: number
    }): Promise<SessionProperties>
    find(sessionId: string): Promise<SessionProperties>
    findAll(options: {
      include?: 'account.profile'
    } & JsonApiCollectionOptions): Promise<SessionProperties[]>
    remove(sessionId: string): Promise<SessionProperties>
    removeAll(options: JsonApiCollectionOptions): Promise<SessionProperties[]>
  }
  accounts: {
    add(object: {username: string, password: string}): Promise<AccountProperties>
    find(idOrObject: string | {id: string, username: string, token: string}, options: {include?: 'profile'}): Promise<AccountProperties>
    findAll(options: {include?: 'profile'} & JsonApiCollectionOptions): Promise<AccountProperties[]>
    update(idOrObject: IdOrObject, changedProperties: Partial<AccountProperties>, options: {include?: 'profile'}): Promise<AccountProperties>
      update(accountProperties, optins)
      // ...
  }
  requests: {}
  account(idOrObject: IdOrObject): AccountApi
}

export interface AccountApi {
  // TODO
}

// from https://github.com/hoodiehq/hoodie-account-server/blob/3c84e1/routes/utils/request-to-session-id.js?ts=2
function toSessionId(request: Request) {
  if (!request.headers.authorization) {
    return ''
  }

  return request.headers.authorization.substr(8)
}

export function register(server: Server, options: HoodieOptions, next: (err?: Error) => void): void {
  const opts = options.app.rocketChat || {}

  const accounts = (server.plugins.account as HoodieAccountsPlugin).api


  const web = opts.rootUrl || 'http://localhost:3000';
  // if you didn't set up mongodb automatically, this can be found at
  // .meteor/local/db/METEOR-PORT in whatever folder mongodb is run from
  const mongodb = opts.mongoUrl || 'mongodb://localhost:3001';
  // database: meteor
  // db.getCollection('users').find({})

  let client: MongoClient | null = null;

  server.route({
    method: 'GET',
    path: '/api/auth',
    async handler(request, reply) {
      // Hoodie auth headers start with "Session " = 8 characters
      const sessionId = toSessionId(request)

      if (client == null) client = await MongoClient.connect(mongodb, {
        autoReconnect: true
      });

      let session: SessionProperties
      try {
        session = await accounts.sessions.find(sessionId)
      } catch (err) {
        console.error(err)
        reply().code(401)
        return
      }

      // TODO: get user from hoodie internals using mongodb and set the user's `services.iframe.token`
      // lookup via username, create if not exists
      // db.getCollection('users').find({username: session.account.username})

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