//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app =  require('../app.js');

const add = require('../routes/index.js')
const assert = require('assert')
, addRaupp = {'nome':'José Raupp','idade':'35'};
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

    it('Deve retornar o status como 200 para /user', function (done) {
        chai
            .request(app)
            .get('/user')
            .then(function(res) {
                expect(res).to.have.status(200);
                done();
        })
        .catch(function(err) {
            throw (err);
            })
        });

    it('deveria criar o usuario raupp', function (done) {
        chai.request(app)
        .post('/user/add')
        .type('json')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res.body).assert.property(addRaupp)
            done();
            })
        });

    it('deveria ler o usuario raupp', function (done) {
        chai.request(app)
        .get('/user/5')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        })
    });
    //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste

    it('o usuario naoExiste não existe no sistema', function (done) {
        chai.request(app)
        .get('/user')
        .end(function (err, res) {
            expect(res.body).to.be.equal('naoExiste');
            expect(res).to.have.status(200);
            done();
        });
    });

    it('o usuario José Raupp existe e é valido', function (done) {
        chai.request(app)
        //.post('/list')
        .get('/user/5')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });


    it('deveria excluir o usuario raupp', function (done) {
        chai.request(app)
        .delete('/user/15')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res.body).console.log('Usuário deletado!');
            done();
        });
    });

    it('deveria ser uma lista com 5 ou mais usuarios', function (done) {
        chai.request(app)
        .get('/user')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf([6]);
        done();
        });
    });
})