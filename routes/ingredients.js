const express = require('express');
const router = express.Router();

const Ingredient = require('../server/db/models/Ingredient');
const User = require('../server/db/models/User');
const Fridge = require('../server/db/models/Fridge');

const url = '/search?app_id=4774d0c5&app_key=a56469a8e5c8652660440e595a4f5b90&q=';


// router.route('/true')
//   .get((req, res) => {
//     return new Item()
//       .where({ selected: true })
//       .fetchAll({ withRelated: ['users'] })
//       .then(selectedItems => {
//         let item = selectedItems.toJSON();
//         let itemArray = [];
//         item.map(elem => {
//           itemArray.push(elem.name);
//           return itemArray;
//         })
//         itemArray = itemArray.join("%20")
//         console.log(`${itemArray}`);
//          return res.redirect(`https://api.edamam.com/${url}${itemArray}`)
//          .then(result => {
//            console.log('AEWHAEIUHFWEUIFHEWFAEWFUEHFIAUEJEWAJFIEOWJFI',result);
//          })
//       })
//       .catch(err => {
//         console.log({ err: err.message });
//         return res.json({ err: err.message });
//       })
//   })

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
      .fetchAll({ withRelated: ['users'] })
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

    let ingr;
    let id;
    return new Ingredient(data)
      .save()
      .then(ingredient => {
        ingr = ingredient.toJSON();
        id = ingr.id;

        let newData = {ingredient_id : id}
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
      })

      .catch(result => {

        return new Fridge(newData)
        console.log('ingr',{ err: err.message });
        return res.json({ err: err.message });
      })
  })




module.exports = router;