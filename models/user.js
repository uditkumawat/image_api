"use strict";

const winston = require("winston");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({

    email : {type : String,trim:true,unique:true},

    accessKey : {type : String,trim:true},

    secretKey : {type:String,trim:true}

},{
    timestamps : true
});

module.exports = mongoose.model("users",userSchema,"users");