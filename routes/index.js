"use strict";

const path = require('path');
const express = require('express');
const fs = require('fs');
const router = express.Router();
const validate = require('express-validation');
const winston = require("winston");
let multipart = require("connect-multiparty");

const validations = require('./validations');
const CONTROLLER = require('../controllers');


let multipartMiddleware = multipart();

const ERROR = require("../config").APPCONFIG.STATUS_MSG.ERROR;


router.route('*').get((req,res)=>{
   res.sendFile(path.join(__dirname),'public/index.html');
});

router.route('/logs/:type/:date').get((req,res)=>{
    res.sendFile(path.resolve(__dirname+"/../logs/"+req.params.date+'-'+req.params.type+'.log'));
});

router.route('/user').post(validate(validations.userValidation.addUser),CONTROLLER.UserBaseController.addUser);

router.route('/user').put(validate(validations.userValidation.updateUser),CONTROLLER.UserBaseController.regenerateKey);

//authenticating the accessKey
router.use(function(req,res,next){
    
    let accessKey = req.body.accessKey || req.query.accessKey || req.params.accessKey;
    
    if(accessKey){
        
        let credentials = "credentials.json";
        
        fs.readFile(credentials,"utf-8",(err,data)=>{

            if(data){

                let isAccessKeyExists = false;

                let fileData = JSON.parse(data);

                fileData.forEach((obj)=>{

                    if(obj.accessKey==accessKey){
                        
                        req.body.secretKey = obj.secretKey;
                        req.query.secretKey = obj.secretKey;
                        req.params.secretKey = obj.secretKey;
                        isAccessKeyExists = true;
                    }
                });

                if(isAccessKeyExists==true){
                    next();
                }
                else{
                    return res.status(400).json(ERROR.INVALID_ACCESS_KEY);
                }
            }
            else{
                return res.status(400).json(ERROR.SIGN_UP);
            }
        });
    }
    else{
        return res.status(400).json(ERROR.PROVIDE_ACCESS_KEY);
    }
});

router.route('/imagesList').get(validate(validations.imageValidation.getImagesList),CONTROLLER.ImageBaseController.imagesList);

router.route('/image').get(validate(validations.imageValidation.getImage),CONTROLLER.ImageBaseController.getImage);

router.route('/image').post(validate(validations.imageValidation.addImage),multipartMiddleware,CONTROLLER.ImageBaseController.addImage);

router.route('/image').patch(validate(validations.imageValidation.addImage),multipartMiddleware,CONTROLLER.ImageBaseController.updateImage);

router.route('/image').delete(validate(validations.imageValidation.addImage),CONTROLLER.ImageBaseController.deleteImage);

module.exports = router;