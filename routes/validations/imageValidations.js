"use strict";
const Joi= require('joi');

module.exports = {

    getImage:{
        query:{
            accessKey : Joi.string().trim().required(),
            index : Joi.string().trim().optional(),
            name : Joi.string().trim().optional()
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
