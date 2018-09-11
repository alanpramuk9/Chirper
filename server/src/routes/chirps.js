const express = require('express');
const database = require('../db');
let router = express.Router();

//retrive chirp
router.get('/:id?', (req, res) => {
    let id = req.params.id
    if(id) {
        database.GetChirp(id)
        .then((result) => {
            //console.log(result);
            res.send(result);
        }).catch((err) => {
            console.log(err);
        })    
    }else {  
        database.GetChirps()    
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        })    
    }
});

//save chirp
router.post('/', (req,res) => {
    database.CreateChirp(req.body.text, 1)
    .then((results) => {
        res.send(results);
    }).catch((err) => {
        console.log(err);
    }) 
    
});

//delete chirps
router.delete('/:id', (req, res) => {
    console.log('deleting someting');
    let id = req.params.id
    database.DeleteChirp(id)
    .then((result) => {
        res.send(result);
        //res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
    })
})  

//update chirps
router.put('/:id', (req, res) => {
    console.log('updating some stuff');
    console.log(req.body.text);
    let id = req.params.id;
    let chirp = req.body.text;
    database.UpdateChirp(id, chirp)
    .then((results) => {
        res.send(results)
    }).catch((err) => {
        console.log(err);
    })
    
})


module.exports = router;

