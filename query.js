import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "likeme",
  allowExitOnIdle: true,
});

const addPost = async ({ titulo, img, descripcion, likes }) => {
  console.log("Entró addPost: ", titulo, img, descripcion, likes);
  const query = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *";
  const values = [titulo, img, descripcion, likes];
  
  try {
    const result = await pool.query(query, values);
    console.log("---------------------------------------------------------------");
    console.log("Post agregado");
    console.log("Objeto devuelto de la consulta: ", result);
    console.log("Filas procesadas: ", result.rowCount);
    console.log("Información ingresada: ", result.rows[0]);
    console.log("----------------------------------------------------------------");
  } catch (error) {
    console.error("Error al agregar el post:", error.message);
    throw error;
  }
};

const viewPosts = async () => {
  try {
    const { rows, command, rowCount, fields } = await pool.query("SELECT * FROM posts");
    console.log("----------------------------------------------");
    console.log("Posts registrados en la tabla");
    console.log("Instrucción procesada: ", command);
    console.log("Filas procesadas: ", rowCount);
    console.log("Contenido procesado: ", rows);
    console.log("Campos procesados: ", fields);
    console.log("----------------------------------------------");
    return rows;
  } catch (error) {
    console.error("Error al obtener los posts:", error.message);
    throw error;
  }
};

export { addPost, viewPosts };