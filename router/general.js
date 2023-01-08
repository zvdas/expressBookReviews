const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.query;
  // if username and password are not provided, error will be displayed
  if(!username || !password) {
    res.status(403).send("Username and password not provided");
  }
  // if username already exists, error will be displayed
  if(JSON.stringify(users).includes(username)) {
    res.status(403).send("User with username " + username + " already exists");
  }
  users.push({ "username": username, "password": password });
  return res.status(200).send("The user with username " + username + " has been added");
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const filtered_books = books[isbn];
  return res.status(200).send(filtered_books);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const filtered_books = Object.values(books).filter(x=>x.author === author);
  return res.status(200).send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const filtered_books = Object.values(books).filter(x=>x.title === title);
  return res.status(200).send(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const filtered_books = books[isbn].reviews;
  return res.status(200).send(filtered_books);
});

module.exports.general = public_users;
