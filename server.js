const express = require('express');
const helmet = require('helmet');



const server = express();
server.use(express.json());
server.use(helmet());

//route handlers
const accountsRouter = require('./routes/accountsRouter.js');

//routers
server.use('/api/accounts', accountsRouter);

//server testing
server.get('/', (req, res)=> {
    res.send('get server working');
});



module.exports = server;