const { boolean } = require('zod');
const {mongodburl}= require('./secret')

const mongoose = require('mongoose');
mongoose.connect(mongodburl);
const userSchema= new mongoose.Schema({
    "firstname":{
        type:String,
        required:true

    },
    "lastname":{
        type:String,
        required:true
    },
    "username":{
        type:String,
        required:true,
        unique: true

    },
    "password":{
        type:String,
        required:true
    },
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    transactions:{
        invoiceid:String,
        which:String,
        from: String,
        to: String,
        amount:Number,
        date: String,
        time:String,
        message:String,
        status:String
    }
});
const Account = mongoose.model('Account', accountSchema);

const User = mongoose.model('User',userSchema);
module.exports={User,Account}