//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let expect = chai.expect;
let should = chai.should();

const dataStore = require('./../data/store');
const initStateDataStore= { posts : dataStore.posts.slice(0) };

chai.use(chaiHttp);

describe('Comment', () => {

    before(() => {
        let postWithComment = Object.assign({}, dataStore.posts[0]);
        chai.request(server)
            .post('/posts')
            .send(postWithComment)
            .end((err, res) => {
                expect(res).to.be.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.be.have.property('postId');
                expect(postWithComment.name).to.be.equal(dataStore.posts[res.body.postId].name);
                expect(postWithComment.url).to.be.equal(dataStore.posts[res.body.postId].url);
                expect(postWithComment.text).to.be.equal(dataStore.posts[res.body.postId].text);
                expect(dataStore.posts[res.body.postId]).to.be.have.property('comments');
                expect(dataStore.posts[res.body.postId].comments).to.be.a('array');
            });
        
        let postWithoutComment = Object.assign({}, dataStore.posts[0]);
        delete postWithoutComment.comments;
        chai.request(server)
            .post('/posts')
            .send(postWithoutComment)
            .end((err, res) => {
                expect(res).to.be.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.be.have.property('postId');
                expect(postWithoutComment.name).to.be.equal(dataStore.posts[res.body.postId].name);
                expect(postWithoutComment.url).to.be.equal(dataStore.posts[res.body.postId].url);
                expect(postWithoutComment.text).to.be.equal(dataStore.posts[res.body.postId].text);
                expect(dataStore.posts[res.body.postId]).to.be.have.property('comments');
                expect(dataStore.posts[res.body.postId].comments).to.be.a('array');
            });
    });

    after(() => {
        dataStore.posts = initStateDataStore.posts.slice(0);
    });

    describe('/GET', () => {
        it('it should GET all the Comment for specify post with not exist', (done) => {
            chai.request(server)
                .get('/posts/42/comments')
                .end((err, res) => {
                    expect(res).to.be.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.be.have.property('error');
                    expect(res.body.error).to.have.string('Post with ID : 42 does not exist.');
                    done();
                });
        });
 
        it('it should GET all the Comment for specify post exist', (done) => {
            const postId = 0;
            chai.request(server)
                .get(`/posts/${postId}/comments`)
                .end((err, res) => {
                    expect(res).to.be.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body).to.be.lengthOf(3);
                    expect(res.body).to.deep.equal(dataStore.posts[0].comments);
                    done();
                });
        });

        it('it should GET all the Comment for specify post with no comment', (done) => {
            const postId = 1;
            chai.request(server)
                .get(`/posts/${postId}/comments`)
                .end((err, res) => {
                    expect(res).to.be.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body).to.be.lengthOf(0);
                    done();
                });
        });    
    });

    describe('/POST', () => {
        it('it should POST a comment for post dont exist and have HTTP code 404 and error message', (done) => {
            const comment = {
                text: 'lorem ipsum'
            };
            const postId = 42;
            chai.request(server)
                .post(`/posts/${postId}/comments`)
                .send(comment)
                .end((err, res) => {
                    expect(res).to.be.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.be.have.property('error');
                    expect(res.body.error).to.have.string('Post with ID : 42 does not exist.');
                    done();
                });
        });

        it('it should POST a comment without text field have error HTTP code', (done) => {
            const comment = {
                text: ''
            };
            const postId = 0;
            chai.request(server)
                .post(`/posts/${postId}/comments`)
                .send(comment)
                .end((err, res) => {
                    expect(res).to.be.have.status(422);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.be.have.property('error');
                    expect(res.body.error).to.have.string('have error or is required');
                    done();
                });
        });

        it('it should POST a comment and is the same on data store', (done) => {
            const comment = {
                text: 'Ultricies Etiam Quam Mollis Aenean'
            };
            const postId = 0;
            chai.request(server)
                .post(`/posts/${postId}/comments`)
                .send(comment)
                .end((err, res) => {
                    expect(res).to.be.have.status(201);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.be.have.property('commentId');
                });
            
            chai.request(server)
                .get(`/posts/${postId}/comments`)
                .end((err, res) => {
                    expect(res).to.be.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body).to.be.lengthOf(4);
                    expect(res.body).to.deep.equal(dataStore.posts[postId].comments);
                    done();
                });
        }); 
    });

    
    describe('/PUT', () => {
        it('it should PUT comment for post ID is not exist on data store and have HTTP code 404 and error message', (done) => {
            const comment = {
                text: 'Nullam Risus Vulputate Dolor Cras'
            };
            const postId = 42;
            const commentId = 3;
            chai.request(server)
                .put(`/posts/${postId}/comments/${commentId}`)
                .send(comment)
                .end((err, res) => {
                    expect(res).to.be.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.be.have.property('error');
                    expect(res.body.error).to.have.string('Post with ID : 42 does not exist.');
                    done();
                });
        });

        it('it should PUT comment for post ID exist and comment not exist on data store and have HTTP code 404 and error message', (done) => {
            const comment = {
                text: 'Nullam Risus Vulputate Dolor Cras'
            };
            const postId = 0;
            const commentId = 42;
            chai.request(server)
                .put(`/posts/${postId}/comments/${commentId}`)
                .send(comment)
                .end((err, res) => {
                    expect(res).to.be.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.be.have.property('error');
                    expect(res.body.error).to.have.string('Comment with ID : 42 does not exist.');
                    done();
                });
        });

        it('it should PUT comment and check field is updated on data store', (done) => {
            const comment = {
                text: 'Nullam Risus Vulputate Dolor Cras'
            };
            const postId = 0;
            const commentId = 3;
            chai.request(server)
                .put(`/posts/${postId}/comments/${commentId}`)
                .send(comment)
                .end((err, res) => {
                    expect(res).to.be.have.status(204);
                });

            chai.request(server)
                .get(`/posts/${postId}/comments`)
                .end((err, res) => {
                    expect(res).to.be.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body).to.be.lengthOf(4);
                    expect(comment.text).to.be.equal(dataStore.posts[postId].comments[commentId].text);
                    done();
                });
        });  
    });

    
    describe('/DELETE', () => {
        it('it should DELETE a comment for post ID is not exist on data store and have HTTP code 404 and error message', (done) => {
            const postId = 42;
            const commentId = 3;
            chai.request(server)
                .delete(`/posts/${postId}/comments/${commentId}`)
                .end((err, res) => {
                    expect(res).to.be.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.be.have.property('error');
                    expect(res.body.error).to.have.string('Post with ID : 42 does not exist.');
                    done();
                });
        });

        it('it should DELETE a comment for post ID exist and comment not exist on data store and have HTTP code 404 and error message', (done) => {
            const postId = 0;
            const commentId = 42;
            chai.request(server)
                .delete(`/posts/${postId}/comments/${commentId}`)
                .end((err, res) => {
                    expect(res).to.be.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.be.have.property('error');
                    expect(res.body.error).to.have.string('Comment with ID : 42 does not exist.');
                    done();
                });
        });

        it('it should DELETE a comment for post ID and comment exist', (done) => {
            const postId = 0;
            const commentId = 3;
            chai.request(server)
                .delete(`/posts/${postId}/comments/${commentId}`)
                .end((err, res) => {
                    expect(res).to.be.have.status(204);
                });
            chai.request(server)
                .get(`/posts/${postId}/comments`)
                .end((err, res) => {
                    expect(res).to.be.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body).to.be.lengthOf(3);
                    expect(res.body).to.deep.equal(dataStore.posts[postId].comments);
                    done();
                });
        });  
    });
    
});