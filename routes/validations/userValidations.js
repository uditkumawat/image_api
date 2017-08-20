"use strict";
const Joi= require('joi');

module.exports = {

    addUser: {
        body: {
            email : Joi.string().trim().required()
        }
    },
    updateUser:{
        body: {
            email : Joi.string().trim().required()
        }
    }
};
