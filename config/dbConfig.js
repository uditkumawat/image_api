"use strict";

const redis = require('redis');

const winston = require('winston');

class DB {

    constructor() {
        
        this.dbURL = "mongodb://localhost/imagemanagement";
    }
};

module.exports = new DB();