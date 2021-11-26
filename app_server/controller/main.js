const Blog=require('../models/blogs');

const sendJsonResponse=(res,status,content)=>{
    res.status(status);
    res.json(content);
}

module.exports.blogs=function(req,res){
    Blog.find().exec(function(err,blogs){
        if(!blogs){
            sendJsonResponse(res,404,{"message":"blogs not found"});
            return;
        }else if(err){
            sendJsonResponse(res,404,err);
            return;
        }
        console.log("the result is blogs",blogs);
        sendJsonResponse(res,200,blogs);
    });
}
module.exports.create=function(req,res){
    const blog=new Blog(req.body);
    blog.save(function(err,result){
        if(err){
            sendJsonResponse(res,404,err);
            return;
        }
        sendJsonResponse(res,201,result);
    });
}

module.exports.blog=function(req,res){
    const id=req.params.blogId;
    Blog.findById(id).exec(function(err,blog){
        if(!blog){
            sendJsonResponse(res,404,{"message":"blog not found"});
            return;
        }else if(err){
            sendJsonResponse(res,404,err);
            return;
        }
        sendJsonResponse(res,200,blog);
    });
}

module.exports.update=function(req,res){
    const id=req.params.blogId;
    const body=req.body;
    if(!req.body.body)
    {
        sendJsonResponse(res,404,{"message":"body not found"});
        return;
    }
    Blog.findByIdAndUpdate(id,{$set:body},{new:true}).exec(function(err,blog){
        if(!blog){
            sendJsonResponse(res,404,{"message":"blog not found"});
            return;
        }else if(err){
            sendJsonResponse(res,404,err);
            return;
        }
        sendJsonResponse(res,200,blog);
    });
}

module.exports.delete=function(req,res){
    const id=req.params.blogId;
    Blog.findByIdAndRemove(id).exec(function(err,blog){
        if(!blog){
            sendJsonResponse(res,404,{"message":"blog not found"});
            return;
        }else if(err){
            sendJsonResponse(res,404,err);
            return;
        }
        sendJsonResponse(res,204,null);
    });
}
