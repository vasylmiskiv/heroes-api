import express from "express";
import multer from "multer";
import path from "path";
import asyncHandler from "express-async-handler";
import { fileURLToPath } from "url";
import {
  getAllHeroes,
  createHero,
  updateHero,
  getHeroById,
  deleteHero,
  updateHeroImages,
} from "../controllers/heroesController.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/assets"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname);
    req.body.image;
  },
});

const upload = multer({ storage: storage });

router.get("/", asyncHandler(getAllHeroes));

router.post("/", upload.single("image"), asyncHandler(createHero));

router.get("/:id", asyncHandler(getHeroById));

router.put("/:id", upload.single("image"), asyncHandler(updateHero));

router.put("/:id/images", asyncHandler(updateHeroImages));

router.delete("/:id", asyncHandler(deleteHero));

export default router;
