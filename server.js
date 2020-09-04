const express = require('express');
const helmet = require('helmet');

const actionRouter = require('./data/helpers/action-router');
const projectRouter = require('./data/helpers/project-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.use(logger());

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);
server.use('/', (req, res) => {res.send('Hello World!')});

server.get('/', (req, res) => {
    res.send(`<h2>Sprint Day!</h2>`)
}); 

function logger() {
    return (req, res, next) => {
        console.log(`a ${req.method} request was made to ${req.url}`);

        next();
    };
}

module.exports = server; 