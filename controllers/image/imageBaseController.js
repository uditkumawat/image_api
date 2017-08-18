"use strict";

const async = require('async');
const fs = require('fs');
const path = require('path');
const Models = require('../../models');
const CONFIG = require('../../config');

const ERROR = CONFIG.APPCONFIG.STATUS_MSG.ERROR;
const SUCCESS = CONFIG.APPCONFIG.STATUS_MSG.SUCCESS;

let getImage = function(req,res){

    let payload = req.query;
    let pathToSearch = null;

    async.series([
        function(cb){

            //check for accessKey

            cb();
        },
        function(cb){


            pathToSearch = path.join(__dirname,"../../uploads/"+payload.accessKey+"/"+payload.name);

            console.log('pat',pathToSearch);

            if(fs.existsSync(pathToSearch)){
                cb();
            }
            else{
                cb(ERROR.FILE_NOT_FOUND);
            }
        }
    ],function(error,result){
        if (error)
            return res.status(400).json(error);
        else {
            return res.sendFile(pathToSearch);
        }
    })
}

let addImage = function(req,res){

    var payload = req.body;

    async.series([
        function(cb){
            
            //check for accessKey

            cb();
        },
        function(cb){

            //check for folder if does not exists then create

            fs.stat('uploads/'+payload.accessKey,(err,stats)=>{
               if(err){
                   fs.mkdir("uploads/"+payload.accessKey);
                    cb();
               }
                else{
                   cb();
               }
            });
        },
        function(cb){

            if(req.files.image){

                let fileType = req.files.image.type;

                let imageType = fileType.split("/")[1];

                if(fileType.split("/")[0]=='image' && (imageType=='jpg'||imageType=='jpeg'||imageType=='png'||imageType=='gif')){

                    cb();
                }
                else{
                    cb(ERROR.NOT_CORRECT_FORMAT);
                }
            }
            else{
                cb(ERROR.ATTACH_IMAGE);
            }
        },
        function(cb){

            if(req.files.image) {

                fs.readFile(req.files.image.path,(err,data)=>{
 
                    if(err)
                        cb(ERROR.READING_DATA);
                    else 
                    {
                        let uploadedPath = "uploads/" + payload.accessKey + "/" + req.files.image.name;

                        fs.writeFile(uploadedPath, data, (err)=> {
                            if (err)
                                cb(ERROR.UPLOADING_ERROR);
                            else
                                cb();
                        });
                    }
                });
            }
            else{
                cb(ERROR.ATTACH_IMAGE);
            }
        }
    ],function(error,result){
        if (error)
            return res.status(400).json(error);
        else {
            let response = SUCCESS.IMAGE_ADDED;
            return res.send(response);
        }
    })
}

let imagesList = function(req,res){
    
    let payload = req.query;

    let dataToSend = [];

    async.series([
        function(cb){
            
            //check for accessKey
            cb();
        },
        function(cb){
            
            let dirPath = "uploads/"+payload.accessKey;
            
            fs.readdir(dirPath,(err,list)=>{
               if(err)
                   cb(ERROR.DIRECTORY_ERROR);
                else{
                   if(list && list.length>0){
                        dataToSend = list;
                   }
                   cb();
               }
            });
        }
    ],function(error,result){
        if (error)
            return res.status(400).json(error);
        else {
            let response = SUCCESS.IMAGE_LIST;
            response.data = dataToSend;
            return res.send(response);
        }    
    })
}

let updateImage = function(req,res){

    res.send()
}

let deleteImage = function(req,res){

    res.send();
}

module.exports = {
    addImage:addImage,
    imagesList:imagesList,
    getImage:getImage,
    updateImage:updateImage,
    deleteImage : deleteImage
}