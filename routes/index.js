module.exports =  (router) => {

  router.get('/', async (ctx, next) => {
    ctx.body = 'Hello World'
    ctx.body.status = 200
  })

  router.get("/user", async function (ctx, next) {
    let resultQuery = new Promise((resolve, reject) => {
      let query = "SELECT * FROM pessoa"
      ctx.db.query(query, [], (err, result, fields) => {
        if(err) ctx.throw(500, err)
        resolve(result)
      })
    })

    await resultQuery.then((value) => {

      ctx.response.status = 200
      ctx.response.type = "json"
      ctx.response.body = value
      console.log(value)
    })

  })

  router.get('/user/:id', async function (ctx){
    if(!isNaN(ctx.params.id)){
      
      let resultQuery = new Promise((resolve, reject) => {
        let query = "SELECT * FROM pessoa WHERE id = ?"
        ctx.db.query(query, [ctx.params.id], (err, result, fields) => {
          if(err) ctx.throw(500, err)
          resolve(result)
        })
      })
  
      await resultQuery.then((value) => {
  
        ctx.response.status = 200
        ctx.response.type = "json"
        ctx.response.body = value
        console.log(value)
      })
    }
  })

  router.post("/user/add", async function (ctx) {
    if(ctx.request.body){
      let nome = ctx.request.body.nome ? ctx.request.body.nome : '';
      let idade = ctx.request.body.idade ? ctx.request.body.idade : 0;

      let resultQuery = new Promise((resolve, reject) => {
        let query = "INSERT INTO pessoa (nome, idade) VALUES (?, ?)"
        ctx.db.query(query, [nome, idade], (err, result, fields) => {
          if(err) ctx.throw(500, err)
          resolve(result);
        })
      })
  
      await resultQuery.then((value) => {
  
        ctx.response.status = 200
        ctx.response.type = "json"
        ctx.response.body = "Usúario adicionado com sucesso!"
        console.log(value)
      })
    }
  });

  router.delete("/user/:id", async function(ctx){
    if(!isNaN(ctx.params.id)){
      
      let resultQuery = new Promise((resolve, reject) => {
        let query = "DELETE FROM pessoa WHERE id = ?"
        ctx.db.query(query, [ctx.params.id], (err, result, fields) => {
          if(err) ctx.throw(500, err)
          resolve(result)
          
        })
      })
  
      await resultQuery.then((value) => {
        
        ctx.response.type = "json"
        ctx.response.body = "Usúario deletado com sucesso!"
        console.log(value)
      })
    }
  })

  router.put("/user/edit/:id", async (ctx) => {
    if(ctx.request.body && !isNaN(ctx.params.id)){
      let id = ctx.params.id
      let nome = ctx.request.body.nome ? ctx.request.body.nome : '';
      let idade = ctx.request.body.idade ? ctx.request.body.idade : 0;

      let resultQuery = new Promise((resolve, reject) => {
        let query = "UPDATE pessoa SET nome = ?, idade = ? WHERE id = ?"
        ctx.db.query(query, [nome, idade, id], (err, result, fields) => {
          if(err) ctx.throw(500, err)
          resolve(result);
        })
      })
  
      await resultQuery.then((value) => {
  
        ctx.response.status = 200
        ctx.response.type = "json"
        ctx.response.body = "Usúario editado com sucesso!"
        console.log(value)
      })
    }
  })
}
