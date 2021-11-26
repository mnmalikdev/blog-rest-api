
function auth(req,res,next){
    if(!req.session.user){
        res.send("user not authenticated");
        next();

    }
    else if(req.session.user==="authenticated"){
        res.send("user authenticated");
        next();
    }
    else{
        res.send("user not found");
        next();
    }
}

module.exports=auth;