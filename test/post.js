//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let expect = chai.expect;
let should = chai.should();

const dataStore = require('./../data/store');
const initStateDataStore= { posts : dataStore.posts.slice(0) };

chai.use(chaiHttp);

describe('Posts', () => {
    after(() => {
        dataStore.posts = initStateDataStore.posts.slice(0);
    });

    describe('/GET', () => {
        it('it should GET all the Posts', (done) => {
            chai.request(server)
                .get('/posts')
                .end((err, res) => {
                    expect(res).to.be.have.status(200);
                    expect(res.body.posts).to.be.a('array');
                    done();
                });
        });

        it('it should the first Post element is the same on data store', (done) => {
            chai.request(server)
                .get('/posts')
                .end((err, res) => {
                    expect(res).to.be.have.status(200);
                    expect(res.body.posts).to.be.a('array');
                    expect(res.body.posts.length).to.be.equal(1);
                    expect(res.body.posts[0].name).to.be.equal(dataStore.posts[0].name);
                    expect(res.body.posts[0]).to.deep.equal(dataStore.posts[0]);
                    done();
                });
        });
    });

    describe('/POST', () => {
        describe('it should POST a post without missing field have error HTTP code 422 and error message', (done) => {
            it('missing field is : name', (done) => {
                let post = {
                    name: '',
                    url: 'http://acme.com',
                    text: 'Dolor Venenatis Commodo'
                };
                
                chai.request(server)
                    .post('/posts')
                    .send(post)
                    .end((err, res) => {
                        expect(res).to.be.have.status(422);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.be.have.property('error');
                        expect(res.body.error).to.have.string('have error or is required');
                        done();
                    });
            });
    
            it('missing field is : text', (done) => {
                let post = {
                    name: 'Dolor Venenatis Commodo',
                    url: 'http://acme.com'
                };
                
                chai.request(server)
                    .post('/posts')
                    .send(post)
                    .end((err, res) => {
                        expect(res).to.be.have.status(422);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.be.have.property('error');
                        expect(res.body.error).to.have.string('have error or is required');
                        done();
                    });
            });
        });
        

        it('it should POST a post and is the same on data store', (done) => {
            let post = {
                name: 'Lorem Ipsum',
                url: 'http://acme.com',
                text: 'Dolor Venenatis Commodo Sem Tristique Porta'
            };
            
            chai.request(server)
                .post('/posts')
                .send(post)
                .end((err, res) => {
                    expect(res).to.be.have.status(201);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.be.have.property('postId');
                    expect(post.name).to.be.equal(dataStore.posts[res.body.postId].name);
                    expect(post.url).to.be.equal(dataStore.posts[res.body.postId].url);
                    expect(post.text).to.be.equal(dataStore.posts[res.body.postId].text);
                    expect(dataStore.posts[res.body.postId]).to.be.have.property('comments');
                    expect(dataStore.posts[res.body.postId].comments).to.be.a('array');
                    done();
                });
        }); 
    });

    describe('/PUT', () => {
        let post = {
            url: 'http://fake.com'
        };

        it('it should PUT for post and ID not exist on data store and have HTTP code 404 and error message', (done) => {
            chai.request(server)
                .put('/posts/42' )
                .send(post)
                .end((err, res) => {
                    expect(res).to.be.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.be.have.property('error');
                    expect(res.body.error).to.have.string('Post with ID : 42 does not exist.');
                    done();
                });
        });

        it('it should PUT a post and check field is updated on data store', (done) => {
            const postId = 1;
            chai.request(server)
                .put(`/posts/${postId}` )
                .send(post)
                .end((err, res) => {
                    expect(res).to.be.have.status(204);
                    expect(post.url).to.be.equal(dataStore.posts[postId].url);
                    done();
                });
        });  
    });

    describe('/DELETE', () => {
        it('it should DELETE for post and ID not exist on data store and have HTTP code 404 and error message', (done) => {
            chai.request(server)
                .delete('/posts/42')
                .end((err, res) => {
                    expect(res).to.be.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.be.have.property('error');
                    expect(res.body.error).to.have.string('Post with ID : 42 does not exist.');
                    done();
                });
        });

        it('it should DELETE a post and check field is updated on data store', (done) => {
            const postId = 1;
            chai.request(server)
                .delete(`/posts/${postId}`)
                .end((err, res) => {
                    expect(res).to.be.have.status(204);
                    expect(dataStore.posts[postId]).to.be.an('undefined');
                    done();
                });
        });  
    });
});