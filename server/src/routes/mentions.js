const express = require('express');
const database = require('../db');
let router = express.Router();

//create mentions
router.post('/', (req,res) => {
    //console.log('creating a mention ', req.body);
    database.CreateMention(req.body.uid,req.body.cid)
    .then((results) => {
        res.send(results);
    }).catch((err) => {
        console.log(err);
    }) 
});

//retrieves mentions
router.get('/:userid', (req, res) => {
    let id = req.params.userid
    //console.log('userid is ', req.body.userid);
    database.GetMentions(id)
    .then((result) => {
        //console.log(result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })    
})

module.exports = router;