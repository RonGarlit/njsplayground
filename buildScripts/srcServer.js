

/* var express = require('express');
var path = require('path');
var open = require('open'); */

// ABOVE require rewritten in ES6 to use module import
// convert npm script to use babel-node versus node

import express from 'express';
import path from 'path';
import open from 'open';

// Insert webpack and it's config file/location
import webpack from 'webpack';
import config from '../webpack.config.dev';

//This is the console disable for ESLINT on this file.
/* eslint-disable no-console */

//Change var keyword to const ES6 version
/* var port = 3000;
var app = express(); */
const port = 3000;
const app = express();

// call webpack with the config setup above
const compiler = webpack(config);


// Then pass to express the webpack dev middleware with the complier for dev
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

//TUrn off with comment for testing
/*
app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
    {"id": 2,"firstName":"Tammy","lastName":"Norton","email":"tnorton@yahoo.com"},
    {"id": 3,"firstName":"Tina","lastName":"Lee","email":"lee.tina@hotmail.com"}
  ]);
});
*/

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
