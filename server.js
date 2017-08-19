"use strict";

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const winston = require('winston');
const swagger = require('swagger-express');
const path = require('path');
const fs = require('fs');
const expressValidation = require('express-validation');
const multipart = require("connect-multiparty");

const ROUTES = require('./routes');
const CONFIG = require('./config');

class Server{
    
    constructor(){

        this.PORT = CONFIG.SERVERCONFIG.PORT;

        this.app = express();
        this.http = http.Server(this.app);
      
    }

    appConfig(){

        this.app.set('port',this.PORT);
        this.app.use(multipart());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(express.static(path.join(__dirname,'public')));
        
        this.app.use(swagger.init(this.app,{
            apiVersion : '1.0',
            swaggerVersion : '1.0',
            basePath : CONFIG.APPCONFIG.SWAGGER_BASE_LINK + this.PORT,
            swaggerURL : '/swagger',
            swaggerJSON : '/api-docs.json',
            swaggerUI : './public/swagger/',
            apis : ['./swagger/user.yml','./swagger/image.yml'],
            info:{
                title : 'Image APIs',
                name : 'Project APIs'
            }
        }));
    }


    includeRoutes(){

        this.app.use('/api',ROUTES);   // all of our routes will be prefixed with /api

        this.app.use((req,res,next)=>{

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);

            let message = {"METHOD":req.method,"URL":req.url,"BODY":req.body};
            message = JSON.stringify(message);
            winston.log('info',message);

            next();
        });
        
        this.app.use((err,req,res,next)=>{

            if (err instanceof expressValidation.ValidationError) {

                res.send(err);
            } else {
                res.status(500)
                    .json({
                        status: err.status,
                        message: err.message
                    });
            }
        });
    }

    appExecute(){
        
        this.appConfig();
        this.includeRoutes();

        this.http.listen(this.PORT,this.HOST,()=>{
            
            winston.log('info','Server Starts');

            fs.stat('uploads',(err,stats)=>{
                if(err){
                    fs.mkdir("uploads");
                    winston.log("info","Uploads folder created");
                }

            });


            fs.stat('credentials.json',(err,stats)=>{
                if(err){
                    fs.writeFile('credentials.json','',(err)=>{
                    });
                }
            });
        });
    }
};

const SERVER = new Server();
SERVER.appExecute();