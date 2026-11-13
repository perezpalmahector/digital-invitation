// netlify/functions/api.ts
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
// Ajusta la ruta relativa hacia tu archivo de rutas en server/src
import familiasRoutes from "../../server/src/routes/familias.routes";

const app = express();

// Permitir peticiones desde tu dominio de Netlify y en local
app.use(cors());
app.use(express.json());

// Configuramos el router para que acepte tanto la ruta original como la de Netlify
const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Digital Invitation API funcionando en Netlify",
  });
});

router.use("/familias", familiasRoutes);

// Montamos las rutas en ambas bases para evitar errores de redirección
app.use("/api", router);
app.use("/.netlify/functions/api", router);

export const handler = serverless(app);
