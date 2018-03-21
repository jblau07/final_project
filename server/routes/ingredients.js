const express = require('express');
const router = express.Router();

const Ingredient = require('../db/models/Ingredient');
const User = require('../db/models/User');
const Fridge = require('../db/models/Fridge');


router.route('/:id')
  //Get Ingredient by ID (Not Necessary)
  .get((req, res) => {
    let id = req.params.id;
    return new Ingredient()
      .where({ id: id })
      .fetch({ withRelated: ['users'] })
      .then(ingredient => {
        return res.json(ingredient.toJSON());
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })
  })
  //Edit Ingredient (Not Necessary)
  .put((req, res) => {
    let id = req.params.id;
    let data = {} = req.body;
    return new Ingredient(data)
      .where({ id: id })
      .save(data, { patch: true })
      .then(ingredient => {
        return res.json(ingredient)
      })
      .catch(err => {
        res.json({ err: err.message })
      })
  })
  //Delete Ingredient (Not Necessary)
  .delete((req, res) => {
    let id = req.params.id;
    return new Ingredient({ id: id })
      .destroy()
      .then(result => {
        console.log('Item Deleted!');
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })
  })

router.route('/')
  //Get All Ingredients for Fuzzy Search
  .get((req, res) => {
    return new Ingredient()
      .fetchAll()
      .then(ingredients => {
        return res.json(ingredients.toJSON());
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })
  })


  //If Ingredients already exists, find ID
  //If Ingredients doesnt exist, add into Ingredients table
  .post((req, res) => {
    let data = { name } = req.body;
    
    return new Ingredient()
      .where({ name: data.name })
      .fetch()
      .then(ingredient => {
        ingredient = ingredient.toJSON();
        return res.json(ingredient)
      })
      .catch(err => {
        return new Ingredient()
          .save(data)
          .then(ingredient => {
            ingredient = ingredient.toJSON();
            console.log('reddd', ingredient)
            return res.json(ingredient);
          })
          .catch(err => {
            console.log({ err: err.message })
            return res.json({ err: err.message });
          })
        console.log({ err: err.message });
        res.json({ err: err.message })
      })

  })



module.exports = router;