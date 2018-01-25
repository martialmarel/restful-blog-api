'use strict';

const express = require('express');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const commentRouter = express.Router({mergeParams: true});
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