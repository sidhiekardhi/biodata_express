const express= require('express');
const { createBiodata, getBiodata, getBiodataById, updateBiodata, deleteBiodata } = require('../controller/biodata');
const router = express.Router();
const {body} = require('express-validator');
const mysqlConnection = require('../database');

//create-> post
router.post('/biodata', 
[
    body('nama').isLength({min: 5}).withMessage('judul e kurang dowo bos'),
    body('email').isLength({min: 5}).withMessage('emaile kurang dowo boss'),
    body('alamat').isLength({min: 5}).withMessage('alamate kurang dowo boss'),
]
,createBiodata);
router.put('/biodata/:id', 
[
    body('nama').isLength({min: 5}).withMessage('judul e kurang dowo bos'),
    body('email').isLength({min: 5}).withMessage('emaile kurang dowo boss'),
    body('alamat').isLength({min: 5}).withMessage('alamate kurang dowo boss'),
]
,updateBiodata);

router.get('/biodata', getBiodata);
router.get('/biodata/:bioId', getBiodataById);
router.delete('/biodata/:bioId', deleteBiodata);

router.get('/users', (req, res) => {
    mysqlConnection.query("SELECT *from users", (err, rows, field)=>{
        if (!err) {
            res.send(rows)
        } else {
            res.send(err)
        }
    })
})

router.post('/users', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const data = await mysqlConnection.query(`insert into users values ('${username}', '${password}')`, (err, rows, field)=>{
        if (!err) {
            res.send(rows.username)
            console.log(data);
        } else {
            res.send(err)
        }
    })
})


module.exports = router;