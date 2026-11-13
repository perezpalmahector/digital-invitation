import { Router } from "express";
import { obtenerFamiliasDrive } from "../services/drive.service";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const familias = await obtenerFamiliasDrive();

    res.setHeader("Cache-Control", "no-store");

    res.status(200).json({
      success: true,
      total: familias.length,
      data: familias,
    });
  } catch (error) {
    console.error("Error obteniendo familias:", error);

    res.status(502).json({
      success: false,
      message: "No fue posible obtener las familias de Google Drive.",
    });
  }
});

export default router;
