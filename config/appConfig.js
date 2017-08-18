"use strict";

let SWAGGER_BASE_LINK = null;

if(!process.env.NODE_ENV)
{
    SWAGGER_BASE_LINK = "http://localhost:";
}

const STATUS_MSG = {
    ERROR: {
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
        IMAGE_LIST:{
            statusCode: 200,
            message: "Images List",
            type : "IMAGE_LIST",
            data : null
        },
        IMAGE_ADDED:{
            statusCode: 200,
            message: "Image added",
            type : "IMAGE_ADDED",
            data : null
        },
        IMAGE_UPDATED:{
            statusCode: 200,
            message: "Image updated",
            type : "IMAGE_UPDATED",
            data : null
        },
        IMAGE_DETAILS:{
            statusCode: 200,
            message: "Image Details",
            type : "IMAGE_DETAIL",
            data : null
        },
        IMAGE_DELETED:{
            statusCode: 200,
            message: "Image deleted",
            type : "IMAGE_DELETED",
            data : null
        }
    }
};

module.exports = {
    SWAGGER_BASE_LINK : SWAGGER_BASE_LINK,
    STATUS_MSG : STATUS_MSG
};