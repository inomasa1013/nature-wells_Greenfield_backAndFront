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
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
app.use(cors());

app.get("/table", async (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  res.json(await productsController.getAll());
});


app.patch("/table/:id", async (req, res) => {

  // console.log("==========", req.params.id);
  // console.log("====req======", req.on("data", data => { console.log(JSON.parse(data)); }));
  console.log("====req======", req.on("data", data => { console.log(JSON.parse(data)); }));
  req.on("data", async data => {
    const patchData = JSON.parse(data);
    await productsModels.update(req.params.id, patchData.comment, false);
    // res.json(await productsController.getAll())
    res.send(JSON.stringify(await productsController.getAll()))
  })
});

app.listen(PORT, async () => {
  console.log("==========test1=========",
    await productsModels
      .update(3, "sold out", true)
      .then((data) => console.log(data))
  );
  console.log("==============test2============", await productsController.getAll());

  console.log(`Server listening on port ${PORT}`);
});
