'use strict';

const dataStore = require('./../data/store');
const commentController = {};

commentController.getComments = (req, res) => {
	const { postId } = req;

	res.send(dataStore.posts[postId].comments);
};

commentController.addComment = (req, res) => {
	const { postId } = req;
	const { text } = req.body;

	const lastId = dataStore.posts[postId].comments.length - 1;
	const id = lastId + 1;

	const newComment = { text };

	dataStore.posts[postId].comments.push(newComment);

	res.status(201)
		.json({ 'commentId': id });
};

commentController.checkIsCommentExist = (req, res, next) => {
	const { postId } = req;
	const { commentId } = req.params;

	const isCommentExist = typeof dataStore.posts[postId].comments[commentId] === 'undefined' ? false : true;
	if (!isCommentExist) {
		return res.status(404).send({ error: `Comment with ID : ${commentId} does not exist.` });
	}
	next();
};

commentController.updateComment = (req, res) => {
	const { postId } = req;
	const { commentId } = req.params;
	const { text } = req.body;
	
	let comment = dataStore.posts[postId].comments[commentId];

	if (typeof text !== 'undefined') { comment.text = text; } 
	
	dataStore.posts[postId].comments[commentId] = comment;

	res.sendStatus(204);
};

commentController.removeComment = (req, res) => {
	const { postId } = req;
	const { commentId } = req.params;
	
	dataStore.posts[postId].comments.splice(commentId, 1);
  
	res.sendStatus(204);
};

module.exports = commentController;