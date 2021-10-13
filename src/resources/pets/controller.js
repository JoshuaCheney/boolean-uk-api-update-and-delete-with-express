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

function patchPetById (req, res) {
  const id = req.params.id
  const petToPatch = req.body

  let sqlTemplate = `
  UPDATE pets SET
  `;

  const sqlParams = []

  let i = 1
  for (const key in petToPatch) {
    sqlTemplate += `${key} = $${i},`
    sqlParams.push(petToPatch[key])
    i++
  }

  sqlParams.push(id)

  sqlTemplate = sqlTemplate.slice(0, sqlTemplate.length - 1)
  sqlTemplate += `WHERE id = $${i} RETURNING *`
  console.log(sqlParams)
  console.log(sqlTemplate)

  db.query(sqlTemplate, sqlParams)
    .then((result) => res.json({data: result.rows[0]}))
    .catch(console.error)
}

function deleteOneById(req, res) {
  const id = req.params.id

  const deleteInSQL = `
  DELETE FROM
  `
}

module.exports = {
  createOne,
  getAll,
  getOneById,
  updatePetById,
  patchPetById
};
