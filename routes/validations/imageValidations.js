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
            accessKey : Joi.string().trim().required(),
            image : Joi.any().description("Image File")
        }
    },
    updateImage:{
        body: {
            accessKey : Joi.string().trim().required(),
            name : Joi.string().trim().required().description("Name of file which is to updated"),
            image : Joi.any().description("Image File")
        }
    },
    deleteImage: {
        body: {
            accessKey : Joi.string().trim().required(),
            name : Joi.string().trim().required()
        }
    }
};
