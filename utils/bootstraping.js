"use strict";

const winston = require('winston');
const Models = require('../models');

class bootstrap{

    constructor(){

        this.saveAdmin();
    }

    saveAdmin(){

        let admin = {
            emailId : "uditkumawat@gmail.com",
            userName : 'admin',
            cellPhoneNumber : "8989826236",
            countryCode : "+91",
            adminType : 'SUPER_ADMIN'
        };

        admin = new Models.Admin(admin);

        admin.save((err)=>{
        });
    }
};

module.exports = bootstrap;