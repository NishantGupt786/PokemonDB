const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require('mongoose');
const ejs = require("ejs");
const Pokedex = require("pokedex");
const {getPokemon,getAllPokemon,getAllPokemonNames} = require('pkmonjs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

pokedex = new Pokedex();

app.get("/", (req,res)=>{
    res.render("index");
});

app.post("/",async (req,res)=>{
    const pmon = req.body.pokemon;
    const poke = await getPokemon(pmon);
    const pokemonData = pokedex.pokemon(pmon);
    console.log(pokemonData);
    console.log(poke);
    res.render("pokemon", {pokemonData:pokemonData, poke: poke});
});

app.get("/pokemonDB",async (req, res)=>{
    const pokemonarr=await getAllPokemon();
    //console.log(pokemonarr);
    //res.send(pokemonarr);
    res.render("pokemonDB", {pokemonarr: pokemonarr});
})

app.get("/pokemon", async (req, res)=>{
    const name = req.body.name;
    console.log(name);
    const poke =await getPokemon(name);
    res.render("pokemon", {poke: poke});
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
});