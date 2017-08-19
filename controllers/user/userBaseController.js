"use strict";

const async = require('async');
const Models = require('../../models');
const bcrypt = require('bcrypt');
const CONFIG = require('../../config');

const ERROR = CONFIG.APPCONFIG.STATUS_MSG.ERROR;
const SUCCESS = CONFIG.APPCONFIG.STATUS_MSG.SUCCESS;

let addUser = function(req,res){

    let userData = null;
    
    async.series([
        function(cb){
            
            let user = new Models.User(req.body);
            
            user.save((err)=>{
               if(err)
                   cb(ERROR.DB_ERROR);
                else
                   cb();
            });
        },
        function(cb){

            Models.User.find({email:req.body.email},{},(err,dbData)=>{
               if(err)
                   cb(err);
               else{
                   if(dbData.length!=0){
                       userData = dbData;
                   }
                   cb();
               }

            });
        }
    ],function(err,result){
        if(err)
            res.send(err);
        else {
            let response = SUCCESS.USER_ADDED;
            response.data = userData
            res.send();
        }
    })
};

module.exports = {

    addUser : addUser
}