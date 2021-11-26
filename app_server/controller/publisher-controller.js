const Publisher = require('../models/publisher');
const blog=require('../models/blogs');

//sign up as publisher
exports.signUpPublisher = (req, res, next) => {
    const publisher = new Publisher({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        areaOfPublishing: req.body.areaOfPublishing
    });
    publisher.save()
        .then(result => {
            res.status(201).json({
                message: 'Publisher created',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
        });
};
//view blogs of a specific publisher
exports.viewBlogs = (req, res, next) => {
    blog.find({ publisherId: req.params.publisherId })
        .then(result => {
            res.status(200).json({
                message: 'Blog found',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
        });
};
//view single blog of a single publisher
exports.viewBlogByPublisher = (req, res, next) => {
    blog.find({ _id: req.params.blogId, publisherId: req.params.publisherId })
        .then(result => {
            res.status(200).json({
                message: 'Blog found',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
        });
}; 
// update blog as publisher
exports.updateBlog = (req, res, next) => {
    blog.findOneAndUpdate({ _id: req.params.blogId, publisherId: req.params.publisherId }, req.body, { new: true })
        .then(result => {
            res.status(200).json({
                message: 'Blog updated',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
        });
};

//delete blog as publisher
exports.deleteBlog = (req, res, next) => {
    blog.deleteOne({ _id: req.params.blogId, publisherId: req.params.publisherId })
        .then(result => {
            res.status(200).json({
                message: 'Blog deleted',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
        });
};

