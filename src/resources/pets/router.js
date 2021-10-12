const express = require("express");

const { createOne, getAll, getOneById, updatePetById } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:id", updatePetById)

module.exports = router;
