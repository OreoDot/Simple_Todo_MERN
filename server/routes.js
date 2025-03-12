const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb"); // ObjectId is a class that allows us to create a new instance of an ObjectId

const getCollection = () => {
  const client = getConnectedClient(); // get the client; install a variable called client
  const collection = client.db("todosdb").collection("todos"); // ceate a collection called todosdb
  return collection;
}

// GET /todos
router.get("/todos", async (req, res) => {
  const collection = getCollection();
  const todos = await collection.find({}).toArray();

  res.status(200).json(todos);

  //res.status(200).json({ msg: "GET REQUEST TO /api/todos" });
});

// POST /todos
router.post("/todos", async (req, res) => {
  const collection = getCollection();
  let { todo } = req.body;

  if(!todo) {
    return res.status(400).json({ msg: "Please provide a todo" });
  }

  todo = (typeof todo === "string") ? todo : JSON.stringify(todo);

  const newTodo = await collection.insertOne({ todo, status: false });

  //console.log(req.body); //we can only see the body unless we setup the express.json() middleware at index.js

  res.status(201).json({ todo, status: false, _id: newTodo.insertedId });

  //res.status(201).json({ msg: "POST REQUEST TO /api/todos" });
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);

  const deletedTodo = await collection.deleteOne({ _id });

  res.status(200).json(deletedTodo);


  //res.status(200).json({ msg: "DELETE REQUEST TO /api/todos/:id" });
});

// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const { status } = req.body;

  if (typeof status !== "boolean") {
    return res.status(400).json({ msg: "invalid status" });
  }


  const updatedTodo = await collection.updateOne({ _id }, { $set: { status: !status } });

  res.status(200).json(updatedTodo);


  //res.status(200).json({ msg: "PUT REQUEST TO /api/todos/:id" });
});

module.exports = router;