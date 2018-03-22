const express = require('express');
const router = express.Router();

const Cookbook = require('../db/models/Cookbook');



router.route('/:userId/:recipeId')
//Delete Recipe Associated with User from Fridge
  .delete((req, res) => {
    let user_id = req.params.userId;
    let recipe_id = req.params.recipeId;
    return new Cookbook()
      .where({ user_id: user_id, recipe_id: recipe_id })
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


router.route(`/:userId`)
//Get all Recipes Associated with Specific User
  .get((req, res) => {
    let id = req.params.userId;
    return new Cookbook()
      .where({ user_id: id })
      .fetchAll({withRelated:['users','recipes']})
      .then(result => {
        return res.json(result.toJSON());
      })
      .catch(err => {
        console.log({ err: err.message });
      })

  })

  router.route('/')
  .post((req,res)=>{
    let data = {
      user_id: req.body.user_id,
      recipe_id: req.body.recipe_id
    }
    return new Cookbook(data)
    .save()
    .then(result => {
      console.log(result);
      return res.json(result.toJSON());
    })
    .catch(err => {
      console.log({ err: err.message });
      return res.json({ err: err.message });
    })

  })

module.exports = router;