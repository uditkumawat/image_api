"use strict";

let SWAGGER_BASE_LINK = null;

if(!process.env.NODE_ENV)
{
    SWAGGER_BASE_LINK = "http://localhost:";
}

const STATUS_MSG = {
    ERROR: {
        NO_SUCH_IMAGE:{
            statusCode : 404,
            message : 'Not Found',
            type : 'NO_SUCH_IMAGE'
        },
        NOT_ADDED_IMAGES:{
            statusCode : 400,
            message : 'You have not added any images',
            type : 'NOT_ADDED_IMAGES'
        },
        INVALID_ACCESS_KEY:{
            statusCode : 400,
            message : 'Invalid access key',
            type : 'INVALID_ACCESS_KEY'
        },
        PROVIDE_ACCESS_KEY:{
            statusCode : 400,
            message : 'Please provide accessKey in request',
            type : 'PROVIDE_ACCESS_KEY'
        },
        EMAIL_NOT_FOUND:{
            statusCode : 400,
            message : 'Email does not exists.Please Sign up',
            type : 'EMAIL_NOT_FOUND'
        },
        SIGN_UP:{
            statusCode : 400,
            message : 'Please Sign up to get accessKey',
            type : 'SIGN_UP'
        },
        EMAIL_EXISTS:{
            statusCode : 400,
            message : 'Email already exists',
            type : 'EMAIL_EXISTS'
        },
        DB_ERROR:{
            statusCode : 400,
            message : 'Something went wrong in Db connection',
            type : 'DB_ERROR'
        },
        FILE_NAME_ALREADY_EXISTS:{
            statusCode : 400,
            message : 'File name already exists',
            type : 'FILE_NAME_ALREADY_EXISTS'
        },
        NOT_CORRECT_FORMAT:{
            statusCode : 400,
            message : 'Please upload file with correct image format',
            type : 'NOT_CORRECT_FORMAT'
        },
        FILE_NOT_FOUND:{
            statusCode : 404,
            message : 'File not Found',
            type : 'FILE_NOT_FOUND'
        },
        READING_DATA:{
            statusCode : 400,
            message : 'Error in reading data',
            type : 'READING_DATA'
        },
        UPLOADING_ERROR:{
            statusCode : 400,
            message : 'Error in uploading image',
            type : 'UPLOADING_ERROR'
        },
        ATTACH_IMAGE:{
            statusCode : 400,
            message : 'Attach image in form data',
            type : 'ATTACH_IMAGE'
        },
        DIRECTORY_ERROR:{
            statusCode : 400,
            message : 'Directory does not exists',
            type : 'DIRECTORY_ERROR'
        }
    },
    SUCCESS: {
        USER_UPDATED:{
            statusCode: 200,
            message: "User details updated successfully",
            type : "USER_UPDATED"
        },
        USER_ADDED:{
            statusCode: 200,
            message: "User added successfully",
            type : "USER_ADDED"
        },
        IMAGE_LIST:{
            statusCode: 200,
            message: "Images List",
            type : "IMAGE_LIST"
        },
        IMAGE_ADDED:{
            statusCode: 200,
            message: "Image added",
            type : "IMAGE_ADDED"
        },
        IMAGE_UPDATED:{
            statusCode: 200,
            message: "Image updated",
            type : "IMAGE_UPDATED"
        },
        IMAGE_DETAILS:{
            statusCode: 200,
            message: "Image Details",
            type : "IMAGE_DETAIL"
        },
        IMAGE_DELETED:{
            statusCode: 200,
            message: "Image deleted",
            type : "IMAGE_DELETED"
        }
    }
};

module.exports = {
    SWAGGER_BASE_LINK : SWAGGER_BASE_LINK,
    STATUS_MSG : STATUS_MSG
};