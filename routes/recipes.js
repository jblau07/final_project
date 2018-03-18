const axios = require('axios');
const express = require('express');
const router = express.Router();

const User = require('../server/db/models/User');
const Recipe = require('../server/db/models/Recipe');
const Cookbook = require('../server/db/models/Cookbook');

const url = 'https://api.edamam.com/search?app_id=4774d0c5&app_key=a56469a8e5c8652660440e595a4f5b90&from=0&to=3&q=';

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
    //Post Recipe to the DB and the Cookbook
    let data = { name, ingredients, url, image } = req.body;
    let userId;
    userId = 1;
    let ingr;
    let id;
    return new Recipe(data)
      .save()
      .then(recipe => {
        recipe = recipe.toJSON();
        id = recipe.id;

        let newData = { recipe_id: id, user_id: userId }
        return new Cookbook(newData)
          .save()
          .then(result => {
            console.log(result);
            return res.json(result.toJSON());
          })
          .catch(err => {
            console.log({ err: err.message });
            return res.json({ err: err.message });
          })
        return res.json(recipe.toJSON());
      })

      .catch(err => {
        return new Recipe()
          .where({ url: req.body.url })
          .fetch()
          .then(recipe => {
            console.log('FOUND INGREDIENT')
            recipe = recipe.toJSON();
            id = recipe.id;

            newData = { recipe_id: id, user_id: userId }
            return new Cookbook(newData)
              .save()
              .then(result => {
                console.log(result);
                return res.json({ "Cookbook": result.toJSON() });
              })
              .catch(err => {
                console.log({ err: err.message });
                return res.json({ err: err.message });
              })
            return res.json(recipe.toJSON());
          })

        return res.json({ err: err.message });
      })
  })

router.route('/getRecipes')

  .post((req, res) => {

    let recipe;
    let recipeArr = [];
    let ingredientArray = req.body;

    ingredientArray = ingredientArray.join("%20");
    console.log('stuff',ingredientArray)

    axios.get(`${url}${ingredientArray}`)
      .then(result => {
        recipe = result.data.hits;
        return recipe;
      })
      .then(recipe => {
        recipe.map(element => {
          data = {
            recipe:element.recipe.label,
            ingredients:element.recipe.ingredientLines,
            url:element.recipe.url,
            image: element.recipe.image,
          }
          recipeArr.push(data);
          console.log('----------------------------------------------------NEXT RECIPE----------------------------------------------------------')
          console.log(data);
          return recipeArr;
        })
        return res.status(200).json({'recipes':recipeArr});
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })

  })


module.exports = router;