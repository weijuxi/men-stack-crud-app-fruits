const mongoose = require("mongoose");


const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
});


// Create a model
//this object can perform CRUD operations on the database
const Fruit = mongoose.model("Fruit", fruitSchema);

module.exports = Fruit; //export the model to be used in other files