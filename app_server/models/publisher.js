const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const PublisherSchema=new Schema({
    userName:{
        type:String,
        required:true
    },
    profilePic:{
        type:Buffer,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    areaOfPublishing:{
        type:String,
        required:true
    },
});

const Publisher=mongoose.model('Publisher',PublisherSchema);
module.exports=Publisher;