const express = require('express');
const adminController = require('../controller/admin-controller');
const router = express.Router();
//route to signup as admin
router.route('/signup').post(adminController.signUpAdmin);
//route for to see all publishers as admin.
router.route('/publishers').get(adminController.getAllPublishers);
//route with publisher id
router.route('/:publisherId/blogs').get(adminController.getAllBlogsFromPublisher);
//route to see a blog published by a publisher
router.route('/:publisherId/:blogId').get(adminController.getSingleBlogFromPublisher);
//route to change status of a blog from pending or approved
router.route('/blogs/:blogId/:status').put(adminController.changeBlogStatus);
//route to delete a publisher
router.route('/publishers/:publisherId').delete(adminController.removePublisher);
module.exports = router;