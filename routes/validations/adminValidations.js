"use strict";
const Joi= require('joi');

module.exports = {

    addAdmin: {
        body: {
            emailId : Joi.string().required(),
            password : Joi.string().required()
        }
    }
};
