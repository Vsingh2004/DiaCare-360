const express = require('express');

const router = express.Router();

router.get('/add', (req,res) => {
    res.send('resoponsee from add');
});

router.get('/getall', (req,res) => {
    res.send('resoponsee from getall');
});




module.exports = router;