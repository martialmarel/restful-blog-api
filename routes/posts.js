'use strict';

const express = require('express');
const postRouter = express.Router();

const commentRouter = require('./comments');
const postController = require('./../controllers/postController');

postRouter.use('/:postId/comments', 
    postController.checkIsPostExist, 
    commentRouter
);

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