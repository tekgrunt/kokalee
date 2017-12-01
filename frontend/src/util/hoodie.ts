import * as Hoodie from '@hoodie/client'
import PouchDB from 'pouchdb'

export default Hoodie({
  PouchDB,
  url: process.env.ENV === 'development' ? 'https://localhost:8084' : ''
})
