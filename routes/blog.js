const express = require('express');
const router = express.Router();
const multer = require('multer');
// const conn = require('../connect');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload'); // định nghĩa thư mục lưu trữ file sau khi upload ở đây là thư mục upload
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + file.originalname) // lấy time và tên file
    },
});
var upload = multer({storage:storage});
router.get('/', function (req, res, next) {
    res.render('blog/create', {title: 'Create Blog'});
});

// router.post('/upload', upload.single('blogimage'), function (req, res, next) {
//     var fileinfo = req.file;
//     var title = req.body.title;
//     console.log(title);
//     res.send(fileinfo);
// });

router.post('/upload', upload.array('blogimage',5), function (req, res, next) {
    var fileinfo = req.file;
    var title = req.body.title;
    console.log(title);
    res.send(fileinfo);
});

module.exports = router;
