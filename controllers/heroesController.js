import Hero from "../models/heroModel.js";
import asyncHandler from "express-async-handler";

export const getAllHeroes = asyncHandler(async (req, res) => {
  const { page, perPage } = req.query;
  const pageNumber = parseInt(page) || 1;
  const itemsPerPage = parseInt(perPage) || 5;

  try {
    const totalHeroesCount = await Hero.countDocuments();
    const totalPages = Math.ceil(totalHeroesCount / itemsPerPage);

    const heroes = await Hero.find()
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.json({
      heroes,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch heroes" });
  }
});

export const getHeroById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const hero = await Hero.findById(id);

  if (!hero) {
    res.status(404).json({ message: "Hero not found" });
  } else {
    res.status(200).json(hero);
  }
});

export const createHero = asyncHandler(async (req, res) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body;

  const imagePath = `${req.protocol}://${req.get("host")}/assets/${
    req.file.filename
  }`;

  const newHero = new Hero({
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
  });

  newHero.image.push(imagePath);

  const savedHero = await newHero.save();

  res.status(201);
});

export const updateHero = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body;

  const imagePath = req.file
    ? `${req.protocol}://${req.get("host")}/assets/${req.file.filename}`
    : null;

  const hero = await Hero.findById(id);

  if (hero) {
    hero.nickname = nickname;
    hero.real_name = real_name;
    hero.origin_description = origin_description;
    hero.superpowers = superpowers;
    hero.catch_phrase = catch_phrase;

    if (imagePath) {
      hero.image.push(imagePath);
    }

    const updatedHero = await hero.save();

    res.status(200).json(updatedHero);
  } else {
    res.status(404).json({ message: "Hero not found" });
  }
});

export const updateHeroImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  const hero = await Hero.findById(id);

  if (hero) {
    hero.image = image;

    const updatedHero = await hero.save();

    res.status(200).json(updatedHero);
  } else {
    res.status(404).json({ message: "Hero not found" });
  }
});
export const deleteHero = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const hero = await Hero.findById(id);

  if (hero) {
    await hero.remove();

    res.status(200);
  } else {
    res.status(404).json({ message: "Hero not found" });
  }
});
