const User = require('../models/user');
const jwt = require("jsonwebtoken")

// Function to create a user
const createUser = async (username, displayName, password, profilePic) => {
  // Check if the DB if the username is already exists
  const existingUser = await User.findOne({ username });
  // If the username is already exists throw error indicates that.
  if (existingUser) {
    throw new Error('Username already taken. Please select a different username');
  }

   // Create a new user
   const newUser = new User({
    username,
    displayName,
    password,
    profilePic
  });
  return await newUser.save();

}


const loginUser = async (req, res) => {
 // Find the user in the database based on the provided username
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username });
 //handling the case that indeed the user is found
if (user && user.password === password) {
    res.status(201).json({ token: generatetoken(req,res)});
} else if (!user || user.password !== password) {
  throw new Error('Incorrect username or password');
}
};


const generatetoken = (req,res) => {
  const data = { username: req.body.username}
  const key = process.env.SECRET_KEY;
  const token = jwt.sign(data, key,{ expiresIn:process.env.TOKEN_EXPIRATION })
  return token;
 
}


module.exports = { createUser, loginUser }

