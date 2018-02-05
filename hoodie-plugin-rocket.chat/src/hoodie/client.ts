
export = plugin

function plugin(hoodie) {
  hoodie.rocketchat = new plugin.RocketChat(hoodie)
}

namespace plugin {
  export class RocketChat {
    constructor(private hoodie) {}

    auth(sessionId?: string): Promise<any> {
      return (sessionId ?
        Promise.resolve(sessionId) :
        this.hoodie.account.get().then((user) => {
          if (!user.session) throw new Error('Not logged in')
          return user.session.id
        })
      )
      .then((sessionId) => this.hoodie.request({
        method: 'GET',
        url: '/hoodie/rocket.chat/api/auth',
        headers: {
          'Authorization': `Session ${sessionId}`,
          // 'Accept': 'application/vnd.api+json'
          'Accept': 'application/json'
        }
      })).then((response) => {
        return JSON.parse(response.body)
      })
    }
  }
}