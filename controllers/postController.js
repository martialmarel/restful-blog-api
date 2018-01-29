'use strict';

const dataStore = require('./../data/store');
const postController = {};

postController.getPosts = (req, res) => {
	res.send(dataStore);
};

postController.addPost = (req, res) => {
	const { name, url, text } = req.body;

	const lastId = dataStore.posts.length-1;
	const id = lastId + 1;
  
	let errorFields = [];
	if (!name) { errorFields.push('Name');  } 
	if (!url) { errorFields.push('URL'); } 
	if (!text) { errorFields.push('text'); } 

	if (errorFields.length > 0) {
		return res.status(422).send({ error: `Field(s) ( ${errorFields.join(', ')} ) have error or is required` });
	}

	const newPost = { name, url, text, comments: [] };
  
	dataStore.posts.push(newPost);
  
	res.status(201)
		.json({ 'postId': id });
};

postController.checkIsPostExist = (req, res, next) => {
	const { postId } = req.params;

	const isPostExist = typeof dataStore.posts[postId] === 'undefined' ? false : true;
	if (!isPostExist) {
		return res.status(404).send({ error: `Post with ID : ${postId} does not exist.` });
	}
	next();
};

postController.updatePost = (req, res) => {
	const { name, url, text } = req.body;
	const { postId } = req.params;
	
	let post = dataStore.posts[postId];
	if (typeof name !== 'undefined') { post.name = name; } 
	if (typeof url !== 'undefined') { post.url = url; }
	if (typeof text !== 'undefined') { post.text = text; } 
	
	dataStore.posts[postId] = post;

	res.sendStatus(204);
};

postController.removePost = (req, res) => {
	const { postId } = req.params;
	
	dataStore.posts.splice(postId, 1);

	res.sendStatus(204);
};

module.exports = postController;