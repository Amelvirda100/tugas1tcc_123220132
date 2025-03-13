import express from "express";
import cors from "cors";
import UserRouters from "./routes/UserRoutes.js";
import imagesRoutes from './routes/imagesRoutes.js';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config(); // Load variabel lingkungan dari .env

const app = express();
app.use(express.json());

const storage = new Storage({
    keyFilename: process.env.GCS_KEYFILE,  // Pastikan nama file ini sesuai
  });
  
  const bucket = storage.bucket(process.env.GCS_BUCKET);

app.use('/api/images', imagesRoutes);
app.use(cors());
app.use(express.json());
app.use(UserRouters);
app.get('/api/images', (req, res) => {
    res.json({ message: "Daftar gambar di bucket" });
});


app.listen(5000, () => console.log("Server running on port 5000"));
