//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app =  require('../src/index.js');

const add = require('../src/index.js')
const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;


//Inicio dos testes
//testes da aplicação
describe('Testes da aplicaçao',  () => {
    it('o servidor esta online', function (done) {
        chai.request(app)
        .get('/')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
        });
    });

    it('Deve retornar o status como 200 para /list', function (done) {
        chai
            .request(app)
            .get('/list')
            .then(function(res) {
                expect(res).to.have.status(200);
                done();
        })
        .catch(function(err) {
            throw (err);
            })
        });

       it('Testando GET todos os usuarios', function (done) {
        chai
            .request(app)
            .get('/list')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array')
            done();
        })
        
        });
    

    it('deveria ser uma lista vazia de usuarios', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows).to.eql([]);
        done();
        });
    });

    it('deveria ler o usuario raupp', function (done) {
        chai.request('http://localhost:3000')
        //.post('/list')
        .get('/list')
        .then(function(res) {
        expect(res.add('José Raupp').to.equal(true)).
        done();
        })
    });
    //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste

    it('o usuario naoExiste não existe no sistema', function (done) {
        chai.request(app)
        .get('/list')
        .end(function (err, res) {
            expect(rr.response.body).to.be.equal('naoExiste');
            done();
        });
    });

    it('o usuario José Raupp existe e é valido', function (done) {
        chai.request(app)
        .get('/list')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.name).to.have.property(5)
            done();
        });
    });

    it('deveria excluir o usuario raupp', function (done) {
        chai.request(app)
        .delete('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('o usuario raupp não deve existir mais no sistema', function (done) {
        chai.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('deveria ser uma lista com pelo menos 5 usuarios', function (done) {
        chai.request(app)
        .get('/list')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(5);
        done();
        });
    });
})