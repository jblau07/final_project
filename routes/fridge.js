const express = require('express');
const router = express.Router();


const Fridge = require('../server/db/models/Fridge');
const User = require('../server/db/models/User');
const Ingredient = require('../server/db/models/Ingredient');

router.route('/:userId/:ingredientId')
  //Delete Ingredient from Users Fridge
  .delete((req, res) => {
    let user_id = req.params.userId;
    let ingr_id = req.params.ingredientId;
    return new Fridge()
      .where({ user_id: user_id, ingredient_id: ingr_id })
      .destroy()
      .then(result => {
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
    console.log(req.body);

    let data = {
      user_id: req.body.user_id,
      ingredient_id: req.body.ingredient_id
    }
    return new Fridge(data)
      .save()
      .then(result => {
        return res.json({ 'fridge': result.toJSON() });
      })
      .catch(err => {
        console.log('fridge', { err: err.message });
        return res.json({ err: err.message });
      })

  })



module.exports = router;