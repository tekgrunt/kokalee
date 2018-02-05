
import crypto = require('crypto');

import {Server, PluginAttributes, Request} from 'hapi';
import {MongoClient, Db, Collection} from 'mongodb'

import * as pkg from '../package.json'
import {Timestamp} from 'bson';

export interface HoodieOptions {
  [plugin: string]: any
  name: string
  loglevel: string
  plugins: string[]
  app: {
    rocketChat?: PluginOptions
  }
  inMemory: boolean
  client: Record<string, any>
  PouchDB: PouchDB.Static
  db: Record<string, any>
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
export interface HoodieStorePlugin {
  api: HoodieStoreApi
}
export interface HoodieStoreApi {
  on(event: 'add', handler: (object, options) => any)
  on(event: 'update', handler: (object, options) => any)
  on(event: 'remove', handler: (object, options) => any)
  on(event: 'change', handler: (eventName, object, options) => any)
  on(event: 'clear', handler: () => any)
}

// from https://github.com/hoodiehq/hoodie-account-server/blob/3c84e1/routes/utils/request-to-session-id.js?ts=2
function toSessionId(request: Request) {
  // Hoodie auth headers start with "Session " = 8 characters
  if (!request.headers.authorization) {
    return null
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
  let coll: Collection;

  function getClient(): Promise<MongoClient> {
    if (client != null) return Promise.resolve(client)
    return MongoClient.connect(mongodb, {
      autoReconnect: true
    }).then((client) => {
      coll = client.db('meteor').collection('users')
      return client
    })
  }

  // monkey patch sessions, since it seems like it doesn't actually remove the session from the db???
  const origSessionsRemove = server.plugins.account.api.sessions.remove

  server.plugins.account.api.sessions.remove = function (sessionId, options) {
    getClient().then(async (client) => {
      console.log('removing session', sessionId);

      const session = await accounts.sessions.find(sessionId)
      const username = session.account.username
      const user = await coll.findOne(
        {username}, {
          projection: {
            'services.iframe.token': 1
          }
        }
      )
      if (user.services && user.services.iframe && user.services.iframe.token) {
        const result = await coll.findOneAndUpdate({_id: user._id}, {
          $set: {'services.iframe.token': ''}
        })
        console.log('removed rocket chat token', sessionId, result);
      }
    })
    return origSessionsRemove(sessionId, options);
  }

  server.route({
    method: 'GET',
    path: '/api/auth',
    async handler(request, reply) {
      const sessionId = toSessionId(request)
      if (sessionId === null) {
        reply().code(401)
        return
      }

      // Set up mongo client
      if (client === null) client = await getClient()

      // Get session from hoodie
      let session: SessionProperties
      try {
        session = await accounts.sessions.find(sessionId)
      } catch (err) {
        reply().code(401)
        return
      }

      const username = session.account.username
      // TODO: don't upsert and use the rocketchat api to update the record
      // since this could fail if rocketchat changes its schema i guess
      const rocketChatUser = await coll.findOneAndUpdate(
        {username}, {
          $setOnInsert: {
            _id: Random.id(),
            "createdAt": new Date(),
            "avatarOrigin": "none",
            "name": username,
            username,
            "status": "online",
            "statusDefault": "online",
            "utcOffset": 0,
            "active": true,
            "emails": [],
            "type": "user",
            "roles": [
              "user"
            ],
            "statusConnection": "away"
          },
          $set: {
            'services.iframe.token': sessionId
          }
        }, {
          upsert: true
        }
      )
      console.log('added rocket chat user')

      reply(null, {
        token: sessionId
      }).code(201)
    }
  })

  server.route({
    method: 'GET',
    path: '/api/config',
    handler(request, reply) {
      reply(null, {
        rootUrl: web
      })
    }
  })

  next()
}

export namespace register {
  export const attributes: PluginAttributes = {pkg}
}

// from https://github.com/meteor/meteor/tree/master/packages/random
namespace Random {
  const UNMISTAKABLE_CHARS = "23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz";
  const BASE64_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "0123456789-_";
  /**
   * @name Random.fraction
   * @summary Return a number between 0 and 1, like `Math.random`.
   * @locus Anywhere
   */
  export function fraction() {
    var numerator = parseInt(hexString(8), 16);
    return numerator * 2.3283064365386963e-10; // 2^-32
  };

  /**
   * @name Random.hexString
   * @summary Return a random string of `n` hexadecimal digits.
   * @locus Anywhere
   * @param {Number} n Length of the string
   */
  export function hexString(digits) {
    var numBytes = Math.ceil(digits / 2);
    var bytes;
    // Try to get cryptographically strong randomness. Fall back to
    // non-cryptographically strong if not available.
    try {
      bytes = crypto.randomBytes(numBytes);
    } catch (e) {
      // XXX should re-throw any error except insufficient entropy
      bytes = crypto.pseudoRandomBytes(numBytes);
    }
    var result = bytes.toString("hex");
    // If the number of digits is odd, we'll have generated an extra 4 bits
    // of randomness, so we need to trim the last digit.
    return result.substring(0, digits);
  }

  function _randomString(charsCount, alphabet) {
    var digits: string[] = [];
    for (var i = 0; i < charsCount; i++) {
      digits[i] = choice(alphabet);
    }
    return digits.join("");
  }

  /**
   * @name Random.id
   * @summary Return a unique identifier, such as `"Jjwjg6gouWLXhMGKW"`, that is
   * likely to be unique in the whole world.
   * @locus Anywhere
   * @param {Number} [n] Optional length of the identifier in characters
   *   (defaults to 17, or around 96 bits of entropy)
   */
  export function id(charsCount = 17) {
    return _randomString(charsCount, UNMISTAKABLE_CHARS);
  };

  /**
   * @name Random.secret
   * @summary Return a random string of printable characters with 6 bits of
   * entropy per character. Use `Random.secret` for security-critical secrets
   * that are intended for machine, rather than human, consumption.
   * @locus Anywhere
   * @param {Number} [n] Optional length of the secret string (defaults to 43
   *   characters, or 256 bits of entropy)
   */
  export function secret(charsCount = 43) {
    return _randomString(charsCount, BASE64_CHARS);
  }

  /**
   * @name Random.choice
   * @summary Return a random element of the given array or string.
   * @locus Anywhere
   * @param {Array|String} arrayOrString Array or string to choose from
   */
  export function choice(arrayOrString) {
    var index = Math.floor(fraction() * arrayOrString.length);
    if (typeof arrayOrString === "string")
      return arrayOrString.substr(index, 1);
    else
      return arrayOrString[index];
  }
}
