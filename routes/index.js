"use strict";

const path = require('path');
const express = require('express');
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

router.route('/admin').post(validate(validations.adminValidation.addAdmin),CONTROLLER.AdminBaseController.addAdmin);

router.route('/imagesList').get(validate(validations.imageValidation.getImagesList),CONTROLLER.ImageBaseController.imagesList);

router.route('/image').get(validate(validations.imageValidation.getImage),CONTROLLER.ImageBaseController.getImage);

router.route('/image').post(validate(validations.imageValidation.addImage),multipartMiddleware,CONTROLLER.ImageBaseController.addImage);

router.route('/image').patch(validate(validations.imageValidation.addImage),multipartMiddleware,CONTROLLER.ImageBaseController.updateImage);

router.route('/image').delete(validate(validations.imageValidation.addImage),CONTROLLER.ImageBaseController.deleteImage);

module.exports = router;