// GET ALL request example
fetch("https://xu2kt.sse.codesandbox.io/products")
  .then((res) => res.json())
  .then(console.log);

// GET ONE request example
fetch("https://xu2kt.sse.codesandbox.io/products/1")
  .then((res) => res.json())
  .then(console.log);

// POST request example
fetch("https://xu2kt.sse.codesandbox.io/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name: "lemon", price: 0.35 })
})
  .then((res) => res.json())
  .then(console.log);

// PUT request example
fetch("http://localhost:3030/books/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ title: "Transformer", type: "Non-fiction", author: "Me", topic: "Magic", publicationdate: "2525-01-01"  })
})
  .then((res) => res.json())
  .then(console.log);

// DELETE request example
fetch("https://xu2kt.sse.codesandbox.io/products/1", {
  method: "DELETE"
})
  .then((res) => res.json())
  .then(console.log);
