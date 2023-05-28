import express from "express";
import multer from "multer";
import asyncHandler from "express-async-handler";
import {
  getAllHeroes,
  createHero,
  updateHero,
  getHeroById,
  deleteHero,
  updateHeroImages,
} from "../controllers/heroesController.js";

const uploadImage = multer().single("image");

const router = express.Router();

router.get("/", getAllHeroes);

router.post("/", uploadImage, createHero);

router.get("/:id", getHeroById);

router.put("/:id", uploadImage, updateHero);

router.put("/:id/images", updateHeroImages);

router.delete("/:id", deleteHero);

export default router;
