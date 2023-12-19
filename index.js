// Modulos del query
import { addPost, getPosts } from "./query.js";

import express from "express";
const app = express();

import cors from "cors";

// Middleware
app.use(express.json());
app.use(cors());

// Inicio del server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}`);
});

// Get para ver los registros
app.get("/posts", async (req, res) => {
  const posts = await getPosts();
  res.json(posts);
});

// Post para agregar registros
app.post("/posts", async (req, res) => {
  const { title, imgSrc, description, likes } = req.body;
  console.log("Value of req.body in the /posts route: ", req.body);
  await addPost({ title, img: imgSrc, description, likes });
  res.send("Post added successfully");
});