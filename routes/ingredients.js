const express = require('express');
const router = express.Router();

const Ingredient = require('../server/db/models/Ingredient');
const User = require('../server/db/models/User');
const Fridge = require('../server/db/models/Fridge');


router.route('/:id')
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

  //Pass the local storage from front-end to the backend so it can be added into user_id
  .post((req, res) => {
    let data = { name } = req.body;
    console.log('data', req.body.id)
    let userId;
    userId = 1;
    let ingr;
    let id;
    return new Ingredient()
      .save(data)
      .then(ingredient => {
        console.log('ingredient', ingredient)
        ingr = ingredient.toJSON();
        id = ingr.id;

        let newData = {ingredient_id : id, user_id:userId}
        return new Fridge(newData)
          .save()
          .then(result => {
            console.log(result);
            return res.json({'fridge':result.toJSON()});
          })
          .catch(err => {
            console.log('fridge',{ err: err.message });
            return res.json({ err: err.message });
          })
        return res.json(ingredient.toJSON());
      })

      .catch(err => {

        return new Ingredient()
        .where({name:req.body.name})
        .fetch()
        .then(ingredient => {
         console.log('FOUND INGREDIENT')
         console.log('thisingredient', ingredient)
         ingr = ingredient.toJSON();
         id = ingr.id;
  
          newData = {ingredient_id : id, user_id:userId}
          return new Fridge(newData)
            .save()
            .then(result => {
              console.log(result);
              return res.json(result.toJSON());
            })
            .catch(err => {
              console.log('fridge',{ err: err.message });
              return res.json({ err: err.message });
            })
          return res.json(ingredient.toJSON());
        })
      
        return res.json({ err: err.message });
      })
  })




module.exports = router;