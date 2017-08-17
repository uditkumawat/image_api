"use strict";

const redis = require('redis');

const winston = require('winston');

class DB {

    constructor() {

        if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'develop' || process.env.NODE_ENV == 'DEV') {

            this.dbURL = "mongodb://localhost/newdev";
        }
        else {
            this.dbURL = "mongodb://localhost/newLocal";
        }

        this.redisClient = "";
        this.connectRedisDB();
    }

    connectRedisDB(){

        this.redisClient = redis.createClient();

        this.redisClient.on('connect',(err)=>{
            if(err)
                console.log(err);
            else
                console.log('Redis connected');
        })


        this.redisClient.on('error',(err)=>{
            if(err)
                console.log(err);
        })
    }
};

module.exports = new DB();