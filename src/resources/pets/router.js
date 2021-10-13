const express = require("express");

const { createOne, getAll, getOneById, updatePetById, patchPetById } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:id", updatePetById)

router.patch("/:id", patchPetById)

module.exports = router;
