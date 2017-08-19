"use strict";
const Joi= require('joi');

module.exports = {

    addUser: {
        body: {
            emailId : Joi.string().required()
        }
    }
};
