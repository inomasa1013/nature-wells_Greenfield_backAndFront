const express = require("express");
const app = express();
const PORT = 3000;

const productsController = require("./src/product.controller");
const productsModels = require("./src/product.models");
app.get("/table", async (req, res) => {
  res.json(await productsController.getAll());
});

app.patch("/table", (req, res) => {
  productsModels.update();
});

app.listen(PORT, async () => {
  console.log(
    await productsModels
      .update(3, "sold out", true)
      .then((data) => console.log(data))
  );
  console.log(await productsController.getAll());
  console.log(`Server listening on port ${PORT}`);
});
