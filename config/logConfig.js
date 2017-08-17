"use strict";

let fs = require('fs');
let winston = require('winston');
let winstonDailyLogs = require('winston-daily-rotate-file');


class Logs {

    constructor(winston,winstonDailyLogs){

        if(fs.existsSync('logs')==false)
            fs.mkdirSync('logs');

        winston.configure({
            transports: [
                new (winston.transports.Console)({colorize: true}),
                new (winstonDailyLogs)({
                    filename: 'logs/-logs.log',
                    level:'info',
                    name:'info',
                    datePattern: 'yyyy-MM-dd',
                    prepend: true
                }),
                new (winstonDailyLogs)({
                    filename: 'logs/-error.log',
                    level:'error',
                    name:'error',
                    datePattern:'yyyy-MM-dd',
                    prepend: true
                })
            ]
        });
    }
};

module.exports = new Logs(winston,winstonDailyLogs);