import express, { Router } from "express";

export default function setupPokemonRouter(db) {
  const router = express.Router();

  //Create our GET route that just sends back the pokemon data
db.json  router.get("/", function (_request, response) {
    //The underscore means to ignore the param that's not being used
    response.status(200).json({
      //Set our response to have a status of 200 (OK!) and to respond with JSON
      success: true,
      pokemon: db.data.pokemon, //Returns the pokemon from our DB
    });
  });

  router.get("/:pokemon", function (request, response) {
    const todo = request.params.todo;

    const currentTodo = db.data.pokemon.find(
      (todoItem) => todoItem.id === todo
    );

    response.status(200).json({
      success: true,
      todo: currentTodo,
    });
  });
  return router;
}
