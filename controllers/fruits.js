
const express = require("express");
const router = express.Router();

const Fruit = require("../models/fruit");

router.put("/fruits/:fruitId", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
    res.redirect(`/fruits/${req.params.fruitId}`);
})

router.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});

router.get("/fruits/:fruitId", async (req, res) => {
    const fruitId = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: fruitId });
});

router.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
});

router.delete("/fruits/:fruitId", async (req, res) => {
    const deleteFruit  = await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
});

router.get("/fruits/:fruitId/edit", async (req, res) => {
    const fruitId = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", { fruit: fruitId });
})

router.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", {fruits: allFruits });
});
