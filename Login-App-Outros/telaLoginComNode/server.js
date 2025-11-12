import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./auth/routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);

// Exemplo de rota protegida
import { requireAuth } from "./auth/middleware.js";
app.get("/profile", requireAuth, (req, res) => {
  res.json({ userId: req.user.id, email: req.user.email });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
export default app;