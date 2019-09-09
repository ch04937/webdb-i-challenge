const express = require('express');
const User = require('../data/seeds/accounts.js')
const db = require('../data/dbConfig.js');


// database access using knex

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message: 'failed to get accounts'})
    });
});
router.get('/:id', (req, res)=> {
    db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
        if(account) {
            res.status(200).json(account);
        }else{
            res.status(404).json({ message: 'account not found'})
        }
    });
});

router.post('/', (req, res) => {
    const accountsData = req.body;
    //validate data
    db('accounts')
    .insert(accountsData, "id")
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.json(err)
    })
  });

router.put('/:id', (req, res) => {
db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
    if (count) {
        res.status(200).json({ message: `${count} record(s) updated` });
    } else {
        res.status(404).json({ message: 'Account not found' });
    }
    })
    .catch(() => {
    res.status(500).json({ message: 'Could not update the account' });
    });
});

router.delete('/:id', (req, res) => {
db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
    res.status(200).json({ message: `${count} record(s) deleted` });
    })
    .catch(() => {
    res.status(500).json({ message: 'Could not remove the account' });
    });
});

module.exports=router;