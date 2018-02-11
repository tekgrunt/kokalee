import * as Hoodie from '@hoodie/client'
import PouchDB from 'pouchdb-browser'
import WebSQLAdapter from 'pouchdb-adapter-websql'

// import PouchDBLocalStorage from 'pouchdb-adapter-localstorage'

// example iOS safari UA
// Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0 Mobile/15D60 Safari/604.1
const iOSUserAgentRegExp = /^Mozilla\/5\.0 \(iP(hone|ad);/

// WORKAROUND: right now (2018-02-10), the indexdb adapter is broken on native iOS, use websql (or localstorage) instead
if (iOSUserAgentRegExp.test(navigator.userAgent)) {
  // PouchDB.plugin(PouchDBLocalStorage)
  const preferredAdapters = (PouchDB as any).preferredAdapters as string[]
  if (preferredAdapters.indexOf('websql') < 0) {
    PouchDB.plugin(WebSQLAdapter)
  }
  // remove the IndexDB adapter from the list of preferred adapters
  const idbI = preferredAdapters.indexOf('idb')
  if (idbI >= 0) preferredAdapters.splice(idbI, 1)
}

export default Hoodie({
  PouchDB,
  url: ''
})
