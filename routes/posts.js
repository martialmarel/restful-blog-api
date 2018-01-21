'use strict';

const express = require('express');
const postRouter = express.Router();

const commentRouter = require('./comments');
const postController = require('./../controllers/postController');

// trick for access a "postId" in comments route. Nested Routers in Express.js
postRouter.use('/:postId/comments', (req, res, next) => {
    req.postId = req.params.postId;
    next();
}, postController.checkIsPostExist, commentRouter);

postRouter.get('/', postController.getPosts);

postRouter.post('/', postController.addPost);

postRouter.put('/:postId', 
    postController.checkIsPostExist, 
    postController.updatePost
);

postRouter.delete('/:postId', 
    postController.checkIsPostExist, 
    postController.removePost
);

module.exports = postRouter;