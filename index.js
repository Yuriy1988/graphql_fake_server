#!/usr/bin/env node
require('reify');

const path = require('path');
const express = require('express');
const JsonGraphqlServer = require('./src/index');
const fs = require('fs');
const file = 'db.json';

// fixme the build fails without those
global.window = false;
global.document = false;
global.navigator = false;

var dataFilePath = process.argv.length > 2 ? process.argv[2] : file;
var data = require(path.join(process.cwd(), dataFilePath));
var PORT = 4000;
var app = express();

app.use((req, res, next) => {
    if (req.method === 'POST') {
        setTimeout(() => {
            fs.writeFile(file, global.JSON.stringify(data), (err, data) => {
                if (err) {
                    console.log('err', err)
                }
            })
        }, 1);
    }

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.use('/', JsonGraphqlServer.jsonGraphqlExpress(data));

app.listen(PORT);
var msg = `GraphQL server running with your data at http://localhost:${PORT}/`;
console.log(msg); // eslint-disable-line
