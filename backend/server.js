import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Configuração do CORS para web, mobile e ngrok
const allowedOrigins = [
  "http://localhost:19006",
  "http://192.168.3.61:19006",
  "http://localhost:8081",
  "http://192.168.3.61:8081",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    if (origin.includes("ngrok-free.dev")) return callback(null, true);

    return callback(new Error("Not allowed by CORS: " + origin));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use("/api/users", userRoutes);

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.log("Erro ao conectar MongoDB:", err));

app.get("/", (req, res) => res.send("Backend EcoRota funcionando! 🚀"));

// Porta dinâmica
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));




