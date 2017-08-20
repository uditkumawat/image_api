"use strict";

const async = require('async');
const fs = require('fs');
const path = require('path');
const CONFIG = require('../../config');

const ERROR = CONFIG.APPCONFIG.STATUS_MSG.ERROR;
const SUCCESS = CONFIG.APPCONFIG.STATUS_MSG.SUCCESS;

let getImage = function(req,res){

    let payload = req.query;
    let pathToSearch = null;

    async.series([
        function(cb){

            let metaDatafile = "uploads/" + payload.secretKey + "/metadata.json";

            fs.readFile(metaDatafile,"utf-8",(err,data)=>{

                let fileData=[];

                if(data){

                    fileData = JSON.parse(data);

                    if(payload.index && payload.index<fileData.length && fileData[payload.index]){

                        payload.name = fileData[payload.index].name;

                        cb();
                    }
                    else if(payload.name){
                        cb();
                    }
                    else{
                        cb(ERROR.NO_SUCH_IMAGE);
                    }
                }
                else{
                    cb(ERROR.NO_SUCH_IMAGE);
                }
            });
        },
        function(cb){

            pathToSearch = path.join(__dirname,"../../uploads/"+payload.secretKey+"/"+payload.name);

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

            //check for folder if does not exists then create

            fs.stat('uploads/'+payload.secretKey,(err,stats)=>{
               if(err){
                   fs.mkdir("uploads/"+payload.secretKey);
                    cb();
               }
                else{
                   cb();
               }
            });
        },
        function(cb){

            //check for image type

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
            
            fs.readFile(req.files.image.path,(err,data)=>{
 
                if(err)
                    cb(ERROR.READING_DATA);
                else 
                {
                    //making a unique name of image file

                    let timestamp = new Date().getTime().toString();

                    let newFileName = timestamp+"-"+req.files.image.name;

                    req.files.image.name = newFileName;

                    let uploadedPath = "uploads/" + payload.secretKey + "/" + newFileName;

                    fs.writeFile(uploadedPath, data, (err)=> {
                        if (err)
                            cb(ERROR.UPLOADING_ERROR);
                        else {

                            let metaDatafile = "uploads/" + payload.secretKey + "/metadata.json";

                            fs.readFile(metaDatafile,"utf-8",(err,data)=>{

                                let fileData=[];

                                if(data){
                                    fileData = JSON.parse(data);
                                }

                                //removing unnecessary information

                                delete req.files.image.fieldName;
                                delete req.files.image.path;
                                delete req.files.image.headers;

                                //saving its originalName,size and newName in file

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

    let dataToSend = null;

    async.series([
        function(cb){

            let metaDatafile = "uploads/" + payload.secretKey + "/metadata.json";

            fs.readFile(metaDatafile,"utf-8",(err,data)=>{

                let fileData=[];

                if(data){
                    fileData = JSON.parse(data);
                }

                dataToSend = fileData;

                if(payload.hasOwnProperty("skip") && payload.hasOwnProperty("limit")) {

                    payload.skip = parseInt(payload.skip);
                    payload.limit = parseInt(payload.limit);

                    dataToSend = fileData.slice(payload.skip,payload.skip+payload.limit);
                }

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

            pathToSearch = path.join(__dirname,"../../uploads/"+payload.secretKey+"/"+payload.name);

            if(fs.existsSync(pathToSearch)){

                fs.unlink(pathToSearch,(err)=>{
                    if(err){
                        cb(ERROR.NOT_ABLE_TO_DELETE);
                    }
                    else
                    {
                        let metaDatafile = "uploads/" + payload.secretKey + "/metadata.json";

                        fs.readFile(metaDatafile,"utf-8",(err,data)=>{

                            let fileData=[];

                            let updatedData = [];

                            if(data){
                                fileData = JSON.parse(data);

                                updatedData = fileData.filter((obj)=>{

                                    return obj.name!=payload.name;
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