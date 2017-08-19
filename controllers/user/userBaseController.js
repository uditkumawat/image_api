"use strict";

const async = require('async');
const md5 = require('md5');
const fs = require('fs');
const CONFIG = require('../../config');
const UTIL = require('../../utils/utility');

const ERROR = CONFIG.APPCONFIG.STATUS_MSG.ERROR;
const SUCCESS = CONFIG.APPCONFIG.STATUS_MSG.SUCCESS;

let addUser = function(req,res){

    let payload = req.body;

    let credentials = "credentials.json";

    let fileData=[];

    async.series([
        function(cb){

            fs.readFile(credentials,"utf-8",(err,data)=>{

                if(data){
                    
                    let isAlreadyExists = false;
                    
                    fileData = JSON.parse(data);

                    fileData.forEach((obj)=>{

                        if(obj.email==payload.email){
                            
                            isAlreadyExists = true;
                        }
                    });
                    
                    if(isAlreadyExists==true){
                        cb(ERROR.EMAIL_EXISTS);
                    }
                    else{
                        cb();
                    }
                }
                else{
                    cb();
                }
            });
        },
        function(cb){

            payload.accessKey = UTIL.randomString(10);
            payload.secretKey = md5(UTIL.randomString(10)+new Date().getMilliseconds());
            payload.creationTime = new Date();
            payload.updatedTime = new Date();

            fileData.push(payload);

            fs.writeFile(credentials,JSON.stringify(fileData),(err)=>{

            });

            cb();
        }
    ],function(err,result){
        if(err)
            return res.send(err);
        else {
            let response = SUCCESS.USER_ADDED;
            response.data = {"accessKey":payload.accessKey}
            return res.send(response);
        }
    })
};

let regenerateKey = function(req,res){

    let payload = req.body;

    let credentials = "credentials.json";

    let fileData=[];

    let userData = null;

    async.series([
        function(cb){

            fs.readFile(credentials,"utf-8",(err,data)=>{

                if(data){

                    let isEmailExists = false;

                    fileData = JSON.parse(data);

                    fileData.forEach((obj)=>{

                        if(obj.email==payload.email){

                            obj.accessKey = UTIL.randomString(10);
                            obj.updatedTime = new Date();
                            isEmailExists = true;
                            
                            userData = obj.accessKey;
                        }
                    });

                    
                    if(isEmailExists==true){


                        fs.writeFile(credentials,JSON.stringify(fileData),(err)=>{});
                        
                        cb();
                    }
                    else{
                        cb(ERROR.EMAIL_NOT_FOUND);
                    }
                }
                else{
                    cb(ERROR.EMAIL_NOT_FOUND);
                }
            });
        }
    ],function(err,result){
        if(err)
            return res.send(err);
        else {
            let response = SUCCESS.USER_UPDATED;
            response.data = {"newAccessKey":userData}
            return res.send(response);
        }
    })
};

module.exports = {

    addUser : addUser,
    regenerateKey : regenerateKey
}