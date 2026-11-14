import { Router } from "express";
import {
  obtenerFamiliasDrive,
  guardarFamiliasDrive,
  type FamiliaRecord,
} from "../services/drive.service";

const router = Router();

// 1. CONSULTAR TODAS LAS FAMILIAS (GET /api/familias)
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
      message: "No fue posible obtener las familias.",
    });
  }
});

// 2. INSERTAR NUEVA FAMILIA (POST /api/familias)
router.post("/", async (req, res) => {
  try {
    const nuevaFamilia = req.body as FamiliaRecord;

    if (!nuevaFamilia.familia || !nuevaFamilia.familia.trim()) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la familia es obligatorio.",
      });
    }

    // Genera un rowId numérico grande (16 dígitos) si no viene desde el frontend
    if (!nuevaFamilia.rowId) {
      nuevaFamilia.rowId = Number(
        `${Date.now()}${Math.floor(100 + Math.random() * 900)}`,
      );
    }

    if (!nuevaFamilia.id) {
      nuevaFamilia.id = `FAM-${nuevaFamilia.rowId}`;
    }

    const familias = await obtenerFamiliasDrive();
    familias.push(nuevaFamilia);
    await guardarFamiliasDrive(familias);

    return res.status(201).json({
      success: true,
      data: nuevaFamilia,
    });
  } catch (error) {
    console.error("Error insertando familia:", error);

    return res.status(500).json({
      success: false,
      message: "No fue posible registrar la familia.",
    });
  }
});

// 3. MODIFICAR FAMILIA EXISTENTE (PUT /api/familias/:id)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cambios = req.body as Partial<FamiliaRecord>;

    const familias = await obtenerFamiliasDrive();
    const indice = familias.findIndex(
      (f) => f.id === id || String(f.rowId) === id,
    );

    if (indice === -1) {
      return res.status(404).json({
        success: false,
        message: "Familia no encontrada.",
      });
    }

    familias[indice] = {
      ...familias[indice],
      ...cambios,
      id: familias[indice].id,
      rowId: familias[indice].rowId,
    };

    await guardarFamiliasDrive(familias);

    return res.status(200).json({
      success: true,
      data: familias[indice],
    });
  } catch (error) {
    console.error("Error modificando familia:", error);

    return res.status(500).json({
      success: false,
      message: "No fue posible modificar la familia.",
    });
  }
});

// 4. ELIMINAR FAMILIA (DELETE /api/familias/:id)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const familias = await obtenerFamiliasDrive();
    const filtradas = familias.filter(
      (f) => f.id !== id && String(f.rowId) !== id,
    );

    if (filtradas.length === familias.length) {
      return res.status(404).json({
        success: false,
        message: "Familia no encontrada.",
      });
    }

    await guardarFamiliasDrive(filtradas);

    return res.status(200).json({
      success: true,
      message: "Familia eliminada correctamente.",
    });
  } catch (error) {
    console.error("Error eliminando familia:", error);

    return res.status(500).json({
      success: false,
      message: "No fue posible eliminar la familia.",
    });
  }
});

export default router;
