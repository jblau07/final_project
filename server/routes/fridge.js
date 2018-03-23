const express = require('express');
const router = express.Router();


const Fridge = require('../db/models/Fridge');
const User = require('../db/models/User');
const Ingredient = require('../db/models/Ingredient');

router.route('/:userId/:ingredientId')
  //Delete Ingredient from Users Fridge
  .delete((req, res) => {
    let user_id = req.params.userId;
    let ingr_id = req.params.ingredientId;
    return new Fridge()
      .where({ user_id: user_id, ingredient_id: ingr_id })
      .destroy()
      .then(result => {
        return res.json({ success: true });
        console.log('Deleted!');
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })
  })





router.route('/:userId')
  //Get all Ingredients in Fridge Associated with specific User
  .get((req, res) => {
    let user_id = req.params.userId;
    return new Fridge()
      .where({ user_id: user_id })
      .fetchAll({ withRelated: ['users', 'ingredients'] })
      .then(usersIngr => {
        return res.json(usersIngr.toJSON())
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })
  })

  router.route('/')
  .post((req, res) => {

    let data = {
      user_id: req.body.user_id,
      ingredient_id: req.body.newFridgeItem
    }

    return new Fridge()
      .where({user_id: data.user_id, ingredient_id: data.ingredient_id})
      .fetch()
      .then(fridgeIngredient => {
        fridgeIngredient = fridgeIngredient.toJSON();
        return res.json(fridgeIngredient)
      })
      .catch(err => {
        return new Fridge()
          .save(data)
          .then(fridgeIngredient => {
            fridgeIngredient = fridgeIngredient.toJSON()
            return res.json(fridgeIngredient)
          })
          .catch(err => {
            console.log({err: err.message})
            return res.json({err: err.message})
          })
          console.log({ err: err.message });
        res.json({ err: err.message })
      })
  })

module.exports = router;