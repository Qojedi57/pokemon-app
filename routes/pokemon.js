import express, { Router } from "express";

export default function setupPokemonRouter(db) {
  const router = express.Router();

  //Create our GET route that just sends back the pokemon data
  router.get("/", function (_request, response) {
    //The underscore means to ignore the param that's not being used
    response.status(200).json({
      //Set our response to have a status of 200 (OK!) and to respond with JSON
      success: true,
      pokemon: db.data.pokemon, //Returns the pokemon from our DB
    });
  });

  router.get("/:pokemon", function (request, response) {
    const pokemon = request.params.pokemon;

    const currentpokemon = db.data.pokemon.find(
      (pokemonItem) => pokemonItem.name === pokemon
    );

    response.status(200).json({
      success: true,
      name: currentpokemon,
    });
  });

  router.post("/", function (request, response) {
    //Push the new todo
    console.log(request.body)
    db.data.pokemon.push({
      name: request.body.name
    });

    //Save the pokemon to the "database"
    db.write();

    //Respond with 200 (OK!) and tell the user the request is successful
    response.status(200).json({
      success: true,
    });
  });

  router.put("/:pokemon", function (request, response) {
    const pokemon = request.params.pokemon;
    console.log(pokemon);

    const pokemonIndex = db.data.pokemon.findIndex(
      (currentpokemon) => currentpokemon.id === pokemon
    );

    db.data.pokemon[pokemonIndex].name = request.body.name;

    db.write();

    response.status(200).json({
      success: true,
    });
  });

  router.delete("/:pokemon", (request, response) => {
    const pokemon = request.params.pokemon;
    console.log(pokemon);

    const pokemonIndex = db.data.pokemon.findIndex(
      (currentpokemon) => currentpokemon.id === pokemon
    );
    db.data.pokemon.splice(pokemonIndex, 1);
    db.write();

    response.status(200).json({
      success: true,
    });
  });

  return router;
}
