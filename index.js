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
  const { titulo, img, descripcion, likes } = req.body; 
  console.log("valor req.body en la ruta /posts: ", req.body);
  try {
    await addPost({ titulo, img, descripcion, likes });
    res.send("posts agregado con éxito");
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error.message);
    res.status(500).send("Error al procesar la solicitud POST");
  }
});