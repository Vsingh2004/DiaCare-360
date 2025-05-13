const express = require('express');
const Model = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRouter = express.Router();

/* ===========================
   🟢 Create New User 
=========================== */
userRouter.post('/add', (req, res) => {
  const { role, specialization, qualification, experience } = req.body;

  if (role === 'expert') {
    if (!specialization || !qualification || !experience) {
      return res.status(400).json({ message: 'Please provide all expert fields' });
    }
  }

  new Model(req.body)
    .save()
    .then((result) => {
      res.status(200).json({ uniqueId: result.uniqueId });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ===========================
   🔍 Get All Users
=========================== */
userRouter.get('/getall', (req, res) => {
  Model.find()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ===========================
   🔍 Get User by ID
=========================== */
userRouter.get('/getbyid/:id', (req, res) => {
  Model.findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ===========================
   🔍 Get Users by Role
=========================== */
userRouter.get('/getbyrole/:role', (req, res) => {
  Model.find({ role: req.params.role })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ===========================
   🔍 Get User by Email
=========================== */
userRouter.get('/getbyemail/:email', (req, res) => {
  Model.findOne({ email: req.params.email })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ===========================
   🔍 Get Users by City (if applicable)
=========================== */
userRouter.get('/getbycity/:city', (req, res) => {
  Model.find({ city: req.params.city })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ===========================
   ❌ Delete User by ID
=========================== */
userRouter.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ===========================
   🔄 Update User by ID
=========================== */
userRouter.put('/update/:id', (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ===========================
   ⭐ Add to Favorites
=========================== */

userRouter.post('/add-favorite/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params; // type = 'products' or 'articles'
    const userId = req.body.userId;

    if (!['products', 'articles'].includes(type)) {
      return res.status(400).json({ message: 'Invalid favorite type' });
    }

    // Update the user's favorites
    const update = {};
    update[`favorites.${type}`] = id;

    await Model.findByIdAndUpdate(userId, { $addToSet: update }, { new: true })
      .then((result) => res.status(200).json({ message: `${type} added to favorites`, data: result }))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/* ===========================
   ❌ Remove from Favorites
=========================== */
userRouter.post('/remove-favorite/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const userId = req.body.userId;

    if (!['products', 'articles'].includes(type)) {
      return res.status(400).json({ message: 'Invalid favorite type' });
    }

    const update = {};
    update[`favorites.${type}`] = id;

    await Model.findByIdAndUpdate(userId, { $pull: update }, { new: true })
      .then((result) => res.status(200).json({ message: `${type} removed from favorites`, data: result }))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/* ===========================
   🔍 Get All Favorites
=========================== */
userRouter.get('/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await Model.findById(userId)
      .populate('favorites.products')
      .populate('favorites.articles');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      products: user.favorites.products,
      articles: user.favorites.articles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/* ===========================
   🔑 User Authentication
=========================== */
userRouter.post('/authenticate', (req, res) => {
  Model.findOne(req.body)
    .then((result) => {
      if (result) {
        const { _id, name, email, role } = result;
        const payload = { _id, name, email, role };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '1d' },
          (err, token) => {
            if (err) {
              console.log(err);
              res.status(500).json(err);
            } else {
              res.status(200).json({ token });
            }
          }
        );
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ===========================
   📝 Update Profile Data
=========================== */
userRouter.put('/update-profile/:id', async (req, res) => {
  try {
    const { personalInfo, contactDetails, healthDetails } = req.body;

    const updatedUser = await Model.findByIdAndUpdate(
      req.params.id,
      {
        personalInfo,
        contactDetails,
        healthDetails,
      },
      { new: true }
    );

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

module.exports = userRouter;
