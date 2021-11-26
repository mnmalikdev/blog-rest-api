//implement complete user controller
const User = require('../models/users');
module.exports.signup = function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
        if(user!=null){
            console.log("user already exists");
            next(createError(403, "user already exists"));
        }
        else if (err){
            console.log("error occured");
            next(createError(403, "error occured"));
        }
        else{
            User.create({username:req.body.username,
            password:req.body.password})
            res.status(200).json({message:"user created"});
            }
    });
}
module.exports.signin = function(req, res){
    if(!req.session.user){
        User.findOne({username: req.body.username}, function(err, user){
            if(user==null){
                console.log("user does not exist");
                next(createError(403, "user does not exist"));
            }
            else if(user.password != req.body.password){
                console.log("wrong password");
                next(createError(403, "wrong password"));
            }
            else if(user.username===req.body.username && user.password===req.body.password){
                console.log("USERNAME AND PASSWORD IS CORRECT");
                req.session.user = "authenticated",
                res.status(200).json({message:"user authenticated"});
            }
    
        });
    }
    else{
        console.log("user already authenticated");
        next(createError(403, "user already authenticated"));
    }
}

module.exports.signout = function(req, res){
    if(req.session){
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else{
        console.log("user not authenticated");
        next(createError(403, "user not authenticated"));
    }
}