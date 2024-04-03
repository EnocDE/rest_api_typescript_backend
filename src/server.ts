import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";

// Conectar base de datos
async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.bgGreen('Conexión exitosa a la base de datos'));
    
  } catch (error) {
    console.log(colors.bgRed(error));
    console.log(colors.bgYellow('Hubo un error al conectar a la base de datos'));

  }
}
connectDB();
const server = express();

server.use('/api/products', router)


export default server;