// controllers/userController.js
const { default: mongoose } = require('mongoose');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { name, email, profilePic } = req.body;
    const user = new User({ name, email, profilePic });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Could not create the user.' });
  }
};


exports.getAllUsers = async (req,res) => {
  try{
    const users = await User.find()
    res.json(users)
  }
  catch(err){
    res.status(500).json({error:'No users found'})
  }
}

exports.deleteUserByID = async (req,res) => {
  try{
    const userId = req.params.id
    if(!mongoose.Types.ObjectId.isValid(userId)){
      return res.status(400).json({ error: 'Invalid order ID' });
    }
    const deleteUser = await User.findByIdAndDelete(userId);

    if(!deleteUser){
      return res.status(404).json({ error: 'User not found' });
  }
  res.json(deleteUser)
  }
  catch(err){
    console.error('Error deleting user:', err);
    res.status(500).json({error:'No user found'})
  }
}