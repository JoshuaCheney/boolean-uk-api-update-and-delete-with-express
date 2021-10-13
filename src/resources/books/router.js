const express = require("express");

const { createOne, getAll, getOneById, updateOneById, patchBookById } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:id", updateOneById)

router.patch("/:id", patchBookById)

module.exports = router;
