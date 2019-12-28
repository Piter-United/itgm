const fs = require('fs')
const path = require('path')
const aidbox = require('aidbox')
const config = require('./config.json')
require('dotenv').config()

const app_id = process.env.APP_ID || 'prepare-app'
const init_context = {
  debug: false,
  env: {
    init_url: process.env.APP_URL,
    init_client_id: process.env.APP_INIT_CLIENT_ID,
    init_client_secret: process.env.APP_INIT_CLIENT_SECRET,
    app_id,
    app_url: 'http://localhost:3001',
    app_port: 3001,
    app_secret: 'secret'
  },
  manifest: {
    id: app_id,
    type: 'app',
    entities: config.entities,
    resources: config.resources,
    operations: {
      report: {
        method: 'GET',
        path: ['_report'],
        handler: () => Promise.resolve({ report: true })
      }
    }
  }
}

async function start() {
  console.log('try to prepare aidbox', process.env.APP_URL)
  let ctx = null
  try {
    ctx = await aidbox(init_context)
    if (
      config.bundle &&
      Array.isArray(config.bundle) &&
      config.bundle.length > 0
    ) {
      await ctx.request({
        url: '/',
        method: 'POST',
        body: {
          resourceType: 'Bundle',
          type: 'Transaction',
          entry: config.bundle
        }
      })
    }
    if (config.AidboxQuery) {
      const keys = Object.keys(config.AidboxQuery)
      for (let key of keys) {
        const body = config.AidboxQuery[key]
        const query = body.query
        if (query.startsWith('#')) {
          delete body.query
          const fileName = query.slice(1, query.length)
          const fpath = path.join(__dirname, 'sql', fileName)
          if (fs.existsSync(fpath)) {
            body.query = fs.readFileSync(fpath).toString()
          }
        }
        if (body.query && body.query.length > 0) {
          await ctx.request({
            url: `/AidboxQuery/${key}`,
            method: 'PUT',
            body
          })
        }
      }
    }
    console.log('aidbox configured')
    process.exit(0)
  } catch (err) {
    console.log('Error:', err)
    process.exit(1)
  }
}

start()
