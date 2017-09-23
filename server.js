#!/usr/bin/env node

const express = require('express');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');

const bundleRenderer = createBundleRenderer(
    require('./dist/vue-ssr-bundle.json'),
    {
        template: fs.readFileSync('./index.html', 'utf-8')
    }
);

var app = express();

app.use('/dist', express.static('dist'));

app.get('*', (request, response) => {
    bundleRenderer
        .renderToStream({ url: request.path })
        .pipe(response);
});

app.listen(8080);