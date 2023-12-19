import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { addPost, viewPosts } from './query.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor up and running en http://localhost:" + PORT);
});

// Middleware para los errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ ok: false, result: 'Error interno del servidor' });
});

// GET
app.get('/posts', async (req, res, next) => {
  try {
    const result = await viewPosts();
    res.status(200).json({ ok: true, message: 'Posts registrados', result });
  } catch (error) {
    next(error);
  }
});

// POST
app.post('/posts', async (req, res, next) => {
  const { titulo, url, descripcion } = req.body;

  // Validación de datos
  if (!titulo || !url || !descripcion) {
    return res.status(400).json({ ok: false, result: 'Datos incompletos' });
  }

  const post = { titulo, img: url, descripcion };

  try {
    const result = await addPost(post);
    res.status(201).json({ ok: true, message: 'Post agregado con éxito', result });
  } catch (error) {
    next(error);
  }
});

// GET para las rutas no declaradas
app.use('*', (req, res) => {
  res.json({ ok: false, result: '404 Pagina no Encontrada' });
});