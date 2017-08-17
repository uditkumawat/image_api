"use strict";
const Joi= require('joi');

module.exports = {

    getImage:{
        query:{
            accessKey : Joi.string().trim().required(),
            name : Joi.string().trim().required()
        }
    },
    getImagesList:{
        query:{
            accessKey : Joi.string().trim().required()
        }
    },
    addImage: {
        body: {
            accessKey : Joi.string().trim().required()
        }
    }
};
