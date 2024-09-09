const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

// Here is where we import modules
// We begin by loading Express
const express = require("express");

const mongoose = require("mongoose");

//import the fruit model
const Fruit = require("./models/fruit.js");

const app = express();
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

mongoose.connect(process.env.MONGODB_URI);


mongoose.connection.on('connected', function () {
    console.log(`Mongoose connected to ${mongoose.connection.name}`);
});

//middleware====================================
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new


//Endpoints =====================================

app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});

app.get("/fruits/:fruitId", async (req, res) => {
    const fruitId = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: fruitId });
});

app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
});

app.delete("/fruits/:fruitId", async (req, res) => {
    const deleteFruit  = await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
});

app.get("/fruits/:fruitId/edit", async (req, res) => {
    const fruitId = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", { fruit: fruitId });
})

app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", {fruits: allFruits });
});


//landing page aka root route
app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
