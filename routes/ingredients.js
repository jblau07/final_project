const express = require('express');
const router = express.Router();

const ingredient = require('../server/db/models/Ingredient');

const url = '/search?app_id=4774d0c5&app_key=a56469a8e5c8652660440e595a4f5b90&q=';


router.route('/true')
  .get((req, res) => {
    return new Item()
      .where({ selected: true })
      .fetchAll({ withRelated: ['users'] })
      .then(selectedItems => {
        let item = selectedItems.toJSON();
        let itemArray = [];
        item.map(elem => {
          itemArray.push(elem.name);
          return itemArray;
        })
        itemArray = itemArray.join("%20")
        console.log(`${itemArray}`);
         return res.redirect(`https://api.edamam.com/${url}${itemArray}`)
         .then(result => {
           console.log('AEWHAEIUHFWEUIFHEWFAEWFUEHFIAUEJEWAJFIEOWJFI',result);
         })
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })
  })

router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    return new Item()
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
    return new Item(data)
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
    return new Item({ id: id })
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

    return new Item()
      .fetchAll({ withRelated: ['users'] })
      .then(ingredients => {
        return res.json(ingredients.toJSON());
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })

  })
  .post((req, res) => {
    let data = { name, user_id } = req.body;
    data.selected = false;
    return new Item(data)
      .save()
      .then(ingredient => {
        return res.json(ingredient.toJSON());
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })
  })




module.exports = router;