const express = require('express');
const User = require('../data/seeds/accounts.js')
const db = require('../data/dbConfig.js');


// database access using knex

const router = express.Router();

router.get('/', (req, res) => {
    const { id } = req.params;
    db('accounts').where({ id })
    .then(accounts => {
        //we must check the length to find out if our user exist
        if (accounts.length){
            res.status(500).json(accounts);
        }else{
            res.status(404).json({message: 'count not find accounts with the given'})
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message: 'failed to get accounts'})
    })
})
module.exports=router;