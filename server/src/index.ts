import express from "express";
import cors from "cors";
import familiasRoutes from "./routes/familias.routes";

const app = express();

const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:5174",
  }),
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Digital Invitation API funcionando",
  });
});

app.use("/api/familias", familiasRoutes);

app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});
