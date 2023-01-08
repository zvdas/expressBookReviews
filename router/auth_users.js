const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  { "username": "user@gmail.com", "password": "password123" },
];

const isValid = (username) => { //returns boolean
//write code to check is the username is valid
  // if user not registered, display error
  if(JSON.stringify(users).includes(username)) {
    return true;
  }
}

const authenticatedUser = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
  if(users.filter(x=>x.username === username)[0].password === password) {
    return true;
  }

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  const user = { username, password }

  if(!username || !password) {
    return res.status(404).send("Body Empty");
  }
  
  // check if username is valid
  if(!isValid(username)) {
    return res.status(404).send("User with username "+ username +" not registered");
  }
  
  // display error if incorrect password
  if(!authenticatedUser(username, password)) {
    return res.status(403).send("Incorrect password");
  }

  let accessToken = jwt.sign({ data: user }, 'access', { expiresIn: 60 * 60 });
  req.session.authorization = { accessToken };

  return res.status(200).send("User with username " + username + " successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
