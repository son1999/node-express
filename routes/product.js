const express = require('express');
const router = express.Router();
const conn = require('../connect');

router.get('/', function (req, res, next) {
    var query = "SELECT * FROM users";
    conn.query(query, function (err, rows, fields) {
        if (err) throw err;
        res.render('products', {title: 'Products', product: rows});
    });
});

router.get('/create-form', function (req, res, next) {
    res.render('form', {title: 'Products'});
});

router.post('/create', function (req, res, next) {
    var user_name = req.body.name;
    var user_email = req.body.email;
    var sql = `INSERT INTO users (name, email) VALUES ("${user_name}","${user_email}")`;
    conn.query(sql, function (err, rows, fields) {
        if (err) throw err;
        res.redirect('/products');
    });
});

router.get('/edit-form/:id', function (req, res, next) {
    var idUser = req.params.id;
    var sql = `SELECT * FROM users WHERE id = ${idUser}`;
    conn.query(sql, function (err, rows, fields) {
        if (err) throw err;
        res.render('editForm', {title: 'Update Product', product: rows[0]});
    })
});

router.post('/update/:id', function (req, res, next) {
    var user_name = req.body.name;
    var user_email = req.body.email;
    var idUser = req.params.id;
    var sql = `UPDATE users SET name = '${user_name}', email = '${user_email}' WHERE id = ${idUser}`;
    conn.query(sql, function (err, rows, fields) {
        if (err) throw err;
        res.redirect('/products');
    });
});

router.get('/delete/:id', function (req, res, next) {
    var idUser = req.params.id;
    var sql = `DELETE FROM users WHERE id = ${idUser}`;
    conn.query(sql, function (err, result) {
        if(err) throw err;
        res.redirect('/products');
    })
});
module.exports = router;