//admin controller code for node rest api
const Admin=require('../models/admin');
const Publisher = require("../models/publisher");
const blog=require("../models/blogs");

//sign up as admin
exports.signUpAdmin = (req, res, next) => {
    const admin = new Admin({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });
    admin.save()
        .then(result => {
            res.status(201).json({
                message: 'Admin created',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};



//get all publishers from Publisher collection
exports.getAllPublishers = (req, res, next) => {
    Publisher.find()
        .select("_id publisherName")
        .exec()
        .then(docs => {
        const response = {
            count: docs.length,
            publishers: docs.map(doc => {
            return {
                _id: doc._id,
                publisherName: doc.userName
            };
            })
        };
        res.status(200).json(response);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

//get all blogs from a single publisher
exports.getAllBlogsFromPublisher = (req, res, next) => {
    const publisherId = req.params.publisherId;
    blog.find({publisherId:publisherId})
        .select("_id title snippet body comments rating")
        .exec()
        .then(docs => {
        const response = {
            count: docs.length,
            blogs: docs.map(doc => {
            return {
                _id: doc._id,
                title: doc.title,
                description: doc.snippet,
                body: doc.body,
                comments: doc.comments,
                rating: doc.rating
            };
            })
        };
        res.status(200).json(response);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

//view single blog of a publisher
exports.getSingleBlogFromPublisher = (req, res, next) => {
    const blogId = req.params.blogId;
    blog.findById(blogId)
        .select("_id title snippet body comments rating")
        .exec()
        .then(doc => {
        if (doc) {
            res.status(200).json({
            blog: doc
            });
        } else {
            res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

// change status of a blog
exports.changeBlogStatus = (req, res, next) => {
    const blogId = req.params.blogId;
    const status = req.body.status;
    blog.findById(blogId)
        .exec()
        .then(doc => {
        if (doc) {
            doc.status = status;
            doc.save()
                .then(result => {
                res.status(200).json({
                message: "Status changed successfully"
                });
                })
                .catch(err => {
                console.log(err);
                res.status(500).json({
                error: err
                });
            });
        } else {
            res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

//can remove a publisher from publishers
exports.removePublisher = (req, res, next) => {
    const publisherId = req.params.publisherId;
    Publisher.deleteOne({ _id: publisherId })
        .exec()
        .then(result => {
        res.status(200).json({
            message: "Publisher deleted"
        });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}