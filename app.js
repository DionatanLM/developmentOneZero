const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaCompress = require('koa-compress')
const mysql = require('mysql')
const cors = require('@koa/cors');


let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'koa-crud'
})
app.context.db = pool

const config = require('./config')
const routes = require('./routes')

const port = process.env.PORT || config.port

onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(koaCompress({
    filter: (content_type) => {
      return /text/i.test(content_type)
    },
    flush: require('zlib').Z_SYNC_FLUSH
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(cors());

router.get('/', async (ctx, next) => {
    ctx.body = 'Hello World'
  })

routes(router)

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
