const axios = require('axios');
const express = require('express');
const router = express.Router();

const User = require('../db/models/User');
const Recipe = require('../db/models/Recipe');
const Cookbook = require('../db/models/Cookbook');

const api = 'https://api.edamam.com/search?app_id=4774d0c5&app_key=a56469a8e5c8652660440e595a4f5b90&from=0&to=3&q=';

router.route(`/:id`)
  //Get Recipe by ID
  .get((req, res) => {
    let id = req.params.id;
    return new Recipe()
      .where({ id: id })
      .fetch()
      .then(recipe => {
        return res.json(recipe.toJSON());
      })
      .catch(err => {
        console.log({ err: err.message });
      })
  })

router.route('/')
  //Get all Recipes
  .get((req, res) => {
    return new Recipe()
      .fetchAll()
      .then(result => {
        return res.json(result.toJSON());
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })
  })

  .post((req, res) => {

    let data = { name, ingredients, url, image } = req.body;
    return new Recipe(data)
      .save()
      .then(recipe => {
        return res.json(recipe.toJSON());
      })
      .catch(err => {
        return new Recipe()
          .where({ url: req.body.url })
          .fetch()
          .then(recipe => {
            console.log('FOUND RECIPE')
            return res.json(recipe.toJSON());
          })

        return res.json({ err: err.message });
      })
  })

router.route('/getRecipes')

  .post((req, res) => {

    let recipe;
    let recipeArr = [];
    let ingredientArray = req.body.Ingredients;
    if (!req.body) {
      console.log(`req.body dne`)
    }
    console.log('REQ.BODY:', ingredientArray);

    ingredientArray = ingredientArray.join("%20");
    console.log('stuff', ingredientArray)

    axios.get(`${api}${ingredientArray}`)
      .then(result => {
        recipe = result.data.hits;
        return recipe;
      })
      .then(recipe => {
        recipe.map(element => {
          data = {
            recipe: element.recipe.label,
            ingredients: element.recipe.ingredientLines,
            url: element.recipe.url,
            image: element.recipe.image,
          }
          recipeArr.push(data);
          console.log('----------------------------------------------------NEXT RECIPE----------------------------------------------------------')
          console.log(data);
          return recipeArr;
        })
        return res.status(200).json({ 'recipes': recipeArr });
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })

  })


module.exports = router;