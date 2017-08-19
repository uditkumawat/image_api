"use strict";

const redis = require('redis');

const winston = require('winston');

class DB {

    constructor() {
        
        this.dbURL = "mongodb://localhost/imagemanagement";

        //this.redisClient = "";
        //this.connectRedisDB();
    }

    /*connectRedisDB(){

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
    }*/
};

module.exports = new DB();