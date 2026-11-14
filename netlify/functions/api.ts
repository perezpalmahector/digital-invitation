import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import familiasRoutes from "../../server/src/routes/familias.routes";

const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Digital Invitation API funcionando en Netlify",
  });
});

router.use("/familias", familiasRoutes);

app.use("/api", router);
app.use("/.netlify/functions/api", router);

export const handler = serverless(app);
