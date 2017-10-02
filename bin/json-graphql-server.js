#!/usr/bin/env node

const path = require('path');
const express = require('express');
const JsonGraphqlServer = require('../src/');

// fixme the build fails without those
global.window = false;
global.document = false;
global.navigator = false;

var dataFilePath = process.argv.length > 2 ? process.argv[2] : './data.js';
var data = require(path.join(process.cwd(), dataFilePath));
var PORT = 4000;
var app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    }
    else {
        next();
    }
});

app.use('/', JsonGraphqlServer.jsonGraphqlExpress(data));

app.listen(PORT);
var msg = `GraphQL server running with your data at http://localhost:${PORT}/`;
console.log(msg); // eslint-disable-line
