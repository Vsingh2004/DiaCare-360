const express = require('express');
const Model = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRouter = express.Router();

userRouter.post('/add', (req,res) => {
    const { role, specialization, qualification, experience } = req.body;

    // If role is expert, make sure all fields are provided
    if (role === 'expert') {
      if (!specialization || !qualification || !experience) {
        return res.status(400).json({ message: 'Please provide all expert fields' });
      }
    }

    new Model(req.body).save()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    })
});

userRouter.get('/getall', (req,res) => {
    Model.find()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    })
})

userRouter.get('/getbyid/:id', (req,res) => {
    Model.findById(req.params.id)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    })
})

userRouter.get('/getbyemail/:email', (req,res) => {
    Model.findOne({ email : req.params.email })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    })
})

userRouter.get('/getbycity/:city', (req,res) => {
    Model.find({ city : req.params.city })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    })
})

// delete

userRouter.delete('/delete/:id' , (req, res) => {
    Model.findByIdAndDelete(req.params.id )
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    })
})


// update
userRouter.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, {new : true} )
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    })
})

userRouter.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
    .then((result) => {
        if(result){

            const { _id, name, email, role} = result;
            const payload = { _id, name, email,role};
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1d'},
                (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    }else{
                        res.status(200).json({ token })
                    }
                }
            )
        }else{
            res.status(401).json({message: 'Invalid credentials'})
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    })
})



module.exports = userRouter;
