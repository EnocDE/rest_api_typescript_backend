import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions } from "cors";

// Conectar base de datos
export async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    // console.log(colors.bgGreen('Conexión exitosa a la base de datos'));
    
  } catch (error) {
    console.log(colors.bgRed(error));
    console.log(colors.bgYellow('Hubo un error al conectar a la base de datos'));
  }
}
connectDB();

// Instancia de express
const server = express();

// Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function(origin, callback){
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error('Error de CORS'), false)
    }
  }
}

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

export default server;