#!/usr/bin/env node
require('reify');

const path = require('path');
const express = require('express');
const JsonGraphqlServer = require('./src/index');
const fs = require('fs');
const file = 'db.json';
const ip = require("ip");

// fixme the build fails without those
global.window = false;
global.document = false;
global.navigator = false;

const dataFilePath = process.argv.length > 2 ? process.argv[2] : file;
const data = require(path.join(process.cwd(), dataFilePath));
const PORT = process.env.PORT || 4000;
const app = express();

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

const msg = `GraphQL server running with your data at http://${ip.address()}:${PORT}/`;
console.log(msg); // eslint-disable-line
