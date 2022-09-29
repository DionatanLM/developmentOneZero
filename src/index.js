//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require('koa');
var bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const koa = new Koa();
var router = new Router();

// Use as middleware
koa.use(bodyParser());

var data = [
  {"id":1,"name":"Dionatan","email":"dionatan@gmail.com","idade":19},
  {"id":2,"name":"Luana","email":"Luana@gmail.com","idade":25},
  {"id":3,"name":"raupp","email":"jose.raupp@devoz.com.br","idade":35},
  {"id":4,"name":"Luana","email":"Luana@gmail.com","idade":25},
  {"id":5,"name":"Luana","email":"Luana@gmail.com","idade":25},
];

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
  ctx.body = `O servidor está rodando em http://localhost:${PORT}`
});

//Uma rota de exemplo simples aqui.
//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
router.get('/users', async (ctx) => {
    ctx.status = 200;
    ctx.body = {total:0, count: 0, rows:[]}
});

router.get('/list', (ctx) => {
  ctx.body = data
  ctx.status = 200

});
router.post('/add', add);
router.put('/update', update);
router.delete('/delete', deleteData);

async function add(ctx) {
  var uin = ctx.request.body;
  data.push(uin)
  ctx.body = "Data Added"
  ctx.status = 200
}

async function update(ctx) {
  let uin = ctx.request.body;
  const index = data.findIndex((e) => e.id === uin.id)
  let message;
  if( index === -1){
    data.push(uin)
    ctx.status = 200
    ctx.body = "Data Added"
  } else {
    data[index] = uin
    ctx.status = 204
    ctx.body = "Data Updated"
  }
}

async function deleteData(ctx) {
  let uin = ctx.request.body;
  const index = data.findIndex((e) => e.id === uin.id)
  let message;
  if(index === -1){
    message = "Data Not Found"
  } else {
    delete data[index];
    ctx.status = 200
    message= "Data Deleted"
  }
}











koa
  .use(router.routes())
  .use(router.allowedMethods());

const server = koa.listen(PORT);

module.exports = server;