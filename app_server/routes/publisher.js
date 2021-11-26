const express = require('express');
const publisherController = require('../controller/publisher-controller');
const router = express.Router();

router.route('/signup').post(publisherController.signUpPublisher);
router.route('/:publisherId/blogs').get(publisherController.viewBlogs);
router.route('/blogs/:blogId').get(publisherController.viewBlogByPublisher);
router.route('/blogs/:blogId').put(publisherController.updateBlog);
router.route('/blogs/:blogId').delete(publisherController.deleteBlog);
module.exports = router;