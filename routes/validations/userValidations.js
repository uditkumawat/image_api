"use strict";
const Joi= require('joi');

module.exports = {

    addUser: {
        body: {
            email : Joi.string().required()
        }
    },
    updateUser:{
        body: {
            email : Joi.string().required()
        }
    }
};
