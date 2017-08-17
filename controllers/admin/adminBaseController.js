"use strict";

const async = require('async');
const redis = require('../../config/dbConfig').redisClient;
const Models = require('../../models');
const bcrypt = require('bcrypt');
const CONFIG = require('../../config');

const ERROR = CONFIG.APPCONFIG.STATUS_MSG.ERROR;
const SUCCESS = CONFIG.APPCONFIG.STATUS_MSG.SUCCESS;

let addAdmin = function(req,res){

    async.series([
        function(cb){
            
            let admin = new Models.Admin(req.body);
            
            admin.save((err)=>{
               if(err)
                   cb(ERROR.DB_ERROR);
                else
                   cb();
            });
        },
        function(cb){

            Models.Admin.find({},{},(err,dbData)=>{
               if(err)
                   cb(err);
               else{
                   if(dbData.length!=0){
                       redis.set("allAdmins",JSON.stringify(dbData));
                   }
                   cb();
               }

            });
        }
    ],function(err,result){
        if(err)
            res.send(err);
        else
            res.send();
    })
};

module.exports = {

    addAdmin : addAdmin
}