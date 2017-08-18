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
          
            let fileName = "uploads/" + payload.accessKey + "/" + req.files.image.name;

            fs.stat(fileName,(err,stats)=>{
                if(err){
                    cb();
                }
                else{
                    cb(ERROR.FILE_NAME_ALREADY_EXISTS);
                }
            });
            
        },
        function(cb){
            
            fs.readFile(req.files.image.path,(err,data)=>{
 
                if(err)
                    cb(ERROR.READING_DATA);
                else 
                {
                    let uploadedPath = "uploads/" + payload.accessKey + "/" + req.files.image.name;

                    fs.writeFile(uploadedPath, data, (err)=> {
                        if (err)
                            cb(ERROR.UPLOADING_ERROR);
                        else {

                            let metaDatafile = "uploads/" + payload.accessKey + "/metadata.json";

                            fs.readFile(metaDatafile,"utf-8",(err,data)=>{

                                let fileData=[];

                                if(data){
                                    fileData = JSON.parse(data);
                                }

                                fileData.push(req.files.image);

                                fs.writeFile(metaDatafile,JSON.stringify(fileData),'utf-8',(err,data)=>{

                                });
                            });

                            cb();
                        }
                    });
                }
            });
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

    let dataToSend = {};

    dataToSend.names = [];
    dataToSend.fullDetails = [];

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

                       dataToSend.names = list.filter((file)=>{

                           return file!="metadata.json";

                       });
                   }
                   cb();
               }
            });
        },
        function(cb){

            let metaDatafile = "uploads/" + payload.accessKey + "/metadata.json";

            fs.readFile(metaDatafile,"utf-8",(err,data)=>{

                let fileData=[];

                if(data){
                    fileData = JSON.parse(data);
                }

                dataToSend.fullDetails = fileData;

                cb();
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

    let payload = req.body;
    let pathToSearch = null;

    async.series([
        function(cb){

            //check for accessKey

            cb();
        },
        function(cb){

            pathToSearch = path.join(__dirname,"../../uploads/"+payload.accessKey+"/"+payload.name);

            if(fs.existsSync(pathToSearch)){

                fs.unlink(pathToSearch,(err)=>{
                    if(err){
                        cb(ERROR.NOT_ABLE_TO_DELETE);
                    }
                    else
                    {
                        let metaDatafile = "uploads/" + payload.accessKey + "/metadata.json";

                        fs.readFile(metaDatafile,"utf-8",(err,data)=>{

                            let fileData=[];

                            let updatedData = [];

                            if(data){
                                fileData = JSON.parse(data);

                                updatedData = fileData.filter((obj)=>{

                                    return obj.originalFilename!=payload.name;
                                });
                            }

                            fs.writeFile(metaDatafile, JSON.stringify(updatedData), 'utf-8', (err, data)=> {
                            });

                        });

                        cb();
                    }
                })
            }
            else{
                cb(ERROR.FILE_NOT_FOUND);
            }
        }
    ],function(error,result){
        if (error)
            return res.status(400).json(error);
        else {
            let response = SUCCESS.IMAGE_DELETED;
            return res.send(response);
        }
    });
}

module.exports = {
    addImage:addImage,
    imagesList:imagesList,
    getImage:getImage,
    updateImage:updateImage,
    deleteImage : deleteImage
}