const express = require('express');
const router = express.Router();


const Fridge = require('../server/db/models/Fridge');
const User = require('../server/db/models/User');
const Ingredient = require('../server/db/models/Ingredient');

router.route('/:userId')
  .get((req, res) => {
    let user_id = req.params.userId;
    console.log('SOMETHING', user_id)
    return new Fridge()
      .where({ user_id: user_id })
      .fetchAll({ withRelated: ['users','ingredients'] })
      .then(usersIngr => {
        return res.json(usersIngr.toJSON())
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })
  })
router.route('/:userId/:ingredientId')

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

// router.route('/selected')
//   .get((req, res) => {
//     return new Fridge()
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


module.exports = router;