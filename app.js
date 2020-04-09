const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mongoose = require("mongoose");
const JSONDataController = require("./controller/JSONDataController");
mongoose
  .connect("mongodb://localhost:27017/Assignment", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("connection failed"));

app.use("/JSONData", JSONDataController);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
