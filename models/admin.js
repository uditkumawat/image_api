"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const APPCONFIG = require('../config/appConfig.js');

let admin = new Schema({
    
    emailId : {type:String,default:null},
    userName : {type : String,unique:true},
    cellPhoneNumber : {type:String,default:null,index:true},
    countryCode : {type:String,default:null},
    password : {type: String,default:null},
    accessToken : {type : String,default:null},
    adminType : {type : String,enum:APPCONFIG.ADMIN_TYPES}
},{
    timestamps : true
});

module.exports = mongoose.model('admin',admin,'admin');