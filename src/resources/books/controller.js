const db = require("../../utils/database");

function createOne(req, res) {
  const createOne = `
    INSERT INTO books
      (name, type, author, topic, publicationDate)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  db.query(createOne, Object.values(req.body))
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAll = `
    SELECT *
    FROM books;
  `;

  db.query(getAll)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneById = `
    SELECT *
    FROM books
    WHERE id = $1;
  `;

  db.query(getOneById, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updateOneById(req, res) {
  console.log("Working")
  const bookToUpdate ={
    id: req.params.id,
    ...req.body
  }

  const updateBookWithSQL = `
  UPDATE books
  SET title = $1,
  SET type = $2,
  SET author = $3,
  SET topic = $4,
  SET publicationdate = $5
  WHERE id = $6
  RETURNING *;
  `
  db.query(updateBookWithSQL, [bookToUpdate.title, bookToUpdate.type, bookToUpdate.author, bookToUpdate.topic, bookToUpdate.publicationdate, bookToUpdate.id])
  .then((result) => res.json({books: result.rows[0]}))
  .catch(console.error)
};

function patchBookById(req, res) {
  const id = req.params.id
  const bookToPatch = req.body

  let sqlTemplate = `
  UPDATE books SET
  `;

  console.log("bookToPatch obj", bookToPatch)

  const sqlParams = []

  let i = 1
  for (const key in bookToPatch) {
    sqlTemplate += `${key} = $${i},`
    sqlParams.push(bookToPatch[key])
    i++
  }

  sqlParams.push(id)

  sqlTemplate = sqlTemplate.slice(0, sqlTemplate.length - 1)
  sqlTemplate += `WHERE id = $${i} RETURNING *`

  console.log(sqlTemplate)
  console.log(sqlParams)

  db.query(sqlTemplate, sqlParams)
    .then((result) => res.json({data: result.rows[0]}))
    .catch(console.error)
} 


console.log("test")


module.exports = {
  createOne,
  getAll,
  getOneById,
  updateOneById,
  patchBookById
};
