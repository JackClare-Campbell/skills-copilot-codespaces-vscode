// Create web server


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

//Create connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "comments"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Create database
app.get('/createdb', function(req, res) {
  var sql = "CREATE DATABASE comments";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Database created");
    res.send('Database created');
  });
});

//Create table
app.get('/createpoststable', function(req, res) {
  var sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Posts table created");
    res.send('Posts table created');
  });
});

//Create table
app.get('/createcommentstable', function(req, res) {
  var sql = "CREATE TABLE comments(id int AUTO_INCREMENT, post_id int, body VARCHAR(255), PRIMARY KEY (id))";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Comments table created");
    res.send('Comments table created');
  });
});

//Insert post
app.get('/addpost1', function(req, res) {
  var post = {title: 'Post One', body: 'This is post number one'};
  var sql = "INSERT INTO posts SET ?";
  con.query(sql, post, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Post 1 added');
  });
});

//Insert post
app.get('/addpost2', function(req, res) {
  var post = {title: 'Post Two', body: 'This is post number two'};
  var sql = "INSERT INTO posts SET ?";
  con.query(sql, post, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Post 2 added');
  });
});

//Select posts
app.get('/getposts', function(req, res) {
  var sql