const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", async (req,res) => {
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
  await users.push({ "username": username, "password": password });
  return res.status(200).send("The user with username " + username + " has been added");
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  const getBooks = new Promise((resolve, reject) => books);
  //Write your code here

  getBooks
    .then(res.status(200).send(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const filtered_books = await books[isbn];
  return res.status(200).send(filtered_books);
 });
  
// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  //Write your code here
  const author = req.params.author;
  const filtered_books = await Object.values(books).filter(x=>x.author === author);
  return res.status(200).send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
  //Write your code here
  const title = req.params.title;
  const filtered_books = await Object.values(books).filter(x=>x.title === title);
  return res.status(200).send(filtered_books);
});

//  Get all book reviews based on ISBN
public_users.get('/review/:isbn', async (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const filtered_books = await books[isbn].reviews;
  return res.status(200).send(filtered_books);
});

module.exports.general = public_users;
