import Express from 'express';
import { Server } from 'http';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

const port = process.env.PORT || 3000;
import api from './routes/api';
import reactRoutes from './routes/react';

// Initialize app
const app = new Express();
const server = new Server(app);

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(Express.static(path.join(__dirname, 'public')));

// Setup routing and rendering
app.use('/api', api);
app.get('*', function (req, res) {
    match(
        { reactRoutes, location: req.url },
        (err, redirectLocation, renderProps) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            let component;
            if (renderProps) {
                component = renderToString(<router.RouterContext {...renderProps}/>);
            } else {
                res.status(404);
            }

            return res.render('index', {component})
        }
    );
});

// Listen on defined port
server.listen(port);


/*
var http = require('http');
var express = require('express');
var path = require('path');
var react = require('react');
var router = require('react-router');

var port = process.env.PORT || 3000;
var api = require('./routes/api');
var react = require('./routes/react');

// Initialize app
var app = express();
var server = http.createServer(app);

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// Setup routing and rendering
app.use('/api', api);
app.get('*', function (req, res) {
    router.match(
        { react, location: req.url },
        function (err, redirectLocation, renderProps) {
            if (err) {
                return res.status(500).send(err.message);
            }

            var component;
            if (renderProps) {
                component = renderToString(<router.RouterContext props={renderProps}/>);
            } else {
                res.status(404);
            }

            return res.render('index', {component})
        }
    );
});

// Listen on defined port
server.listen(port);
 */