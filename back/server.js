const express = require("express");
const cors = require('cors')
const app = express();
const PORT = 8080;

const cors = require("cors");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());


const productsController = require("./src/product.controller");
const productsModels = require("./src/product.models");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/table", async (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  res.json(await productsController.getAll());
});


app.patch("/table/:id", async (req, res) => {
  console.log("==========", req.body);

  await productsModels.update(req.body.id, req.body.comment);
  res.json(await productsController.getAll());
});

app.listen(PORT, async () => {
  console.log(await productsController.getAll());
  console.log(`Server listening on port ${PORT}`);
});
