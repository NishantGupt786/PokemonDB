const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require('mongoose');
const ejs = require("ejs");
const Pokedex = require("pokedex");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

pokedex = new Pokedex();

app.get("/", (req,res)=>{
    res.render("index");
});

app.post("/", (req,res)=>{
    const pmon = req.body.pokemon;
    const pokemonData = pokedex.pokemon(pmon);
    console.log(pokemonData);
    res.render("pokemon", {pokemonData:pokemonData});
});

app.get("/pokemonDB", (req, res)=>{
    const pokemonarr = pokedex.pokemon();
    res.render("pokemonDB", {pokemonarr: pokemonarr});
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
});