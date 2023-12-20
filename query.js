import pkg from "pg";
const { Pool } = pkg;

// Conexion pool
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "likeme",
  allowExitOnIdle: true,
});

const addPost = async ({ titulo, img, descripcion, likes }) => {
  console.log("Entro agregarPost: ", titulo, img, descripcion, likes);
  const consulta =
  "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *";
  const values = [titulo, img, descripcion, likes];
  try {
    const result = await pool.query(consulta, values);
    console.log("Post agregado");
    console.log("Objeto devuelto de la consulta: ", result.rows[0]);
    console.log("Filas procesadas: ", result.rowCount);
  } catch (error) {
    console.error("Error al agregar el post:", error.message);
  }
};

// Contenido tabla
const getPosts = async () => {
  try {
    const { rows, command, rowCount, fields } = await pool.query(
      "SELECT * FROM posts"
    );
    console.log("----------------------------------------------");
    console.log("Post registrados en la tabla");
    console.log("Instrucción procesada: ", command);
    console.log("Filas procesadas: ", rowCount);
    console.log("Contenido procesado: ", rows);
    console.log("Campos procesados: ", fields);
    console.log("----------------------------------------------");

    // Devolvemos resultados y sacamos las funciones a exportar
    return rows;
  } catch (error) {
    console.error("Error al obtener los posts:", error.message);
    throw error;
  }
};

export { addPost, getPosts };
