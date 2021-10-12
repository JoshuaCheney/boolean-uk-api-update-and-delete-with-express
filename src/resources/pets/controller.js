const db = require("../../utils/database");

function createOne(req, res) {
  const createOne = `
    INSERT INTO pets
      (name, age, type, microchip)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *;
  `;

  db.query(createOne, Object.values(req.body))
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAll = `
    SELECT *
    FROM pets;
  `;

  db.query(getAll)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneById = `
    SELECT *
    FROM pets
    WHERE id = $1;
  `;

  db.query(getOneById, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updatePetById(req, res) {
  console.log("working")
  const petToUpdate = {
    id: req.params.id,
    ...req.body
  }

  const updatePetWithSQL= `
  UPDATE pets
  SET name = $1
  SET age = $2
  SET type = $3
  SET breed = $4
  SET microchip = $5
  WHERE id = $6
  RETURNING *;
  `
  db.query(updatePetWithSQL, [petToUpdate.name, petToUpdate.age, petToUpdate.type, petToUpdate.breed, petToUpdate.microchip, petToUpdate.id])
  .then((result) => res.json({pets: result.rows[0]}))
  .catch(console.error)
}

module.exports = {
  createOne,
  getAll,
  getOneById,
  updatePetById
};
