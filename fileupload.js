const multer = require('multer');
const fs = require('fs');
const path = require('path');
const readXlsxFile = require('read-excel-file/node');

const DIR = './uploads/';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storage
}).single('file');

// File upload api
module.exports.addfile = function (req, res, next) {
    upload(req, res, function (err, result) {
        if (err) {
            console.log("No file received");
            res.status(500).json({
                success: false,
                message: "No file received",
                data: null
            });
        } else {
            var file = req.file.path;
            console.log('file received', file);
            // let data = [
            //     [1, 2, 3, 4],
            //     [5, 6, 7, 8],
            //     [9, 10, 11, 12],
            //     [13, 14, 15, 16]
            // ];
            readXlsxFile(file).then((rows) => {
                if(rows != '') {
                    console.log("file read success");
                    res.status(200).json({
                        
                    })
                }
            })
            res.status(200).json({
                success: true,
                message: "file received",
                data: file
            })
        }
    });
}