import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";

export const connectDB = async () => {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))
};