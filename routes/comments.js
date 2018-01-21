'use strict';

const express = require('express');
const commentRouter = express.Router();
const commentController = require('./../controllers/commentController');

commentRouter.get('/', commentController.getComments);

commentRouter.post('/', commentController.addComment);

commentRouter.put('/:commentId', 
    commentController.checkIsCommentExist, 
    commentController.updateComment
);

commentRouter.delete('/:commentId', 
    commentController.checkIsCommentExist, 
    commentController.removeComment
);

module.exports = commentRouter;