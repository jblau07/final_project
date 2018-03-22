const express = require('express');
const router = express.Router();

const User = require('../server/db/models/User')

router.route('/:id')

//Get user by ID
.get((req,res) => {
  let id = req.params.id;
  return new User()
  .where({id:id})
  .fetch()
  .then(user => {
    return res.json(user.toJSON())
  })
  .catch(err => {
    console.log({ err: err.message });
    return res.json({ err: err.message });
  })
})

//Edit username password
.put( (req,res)=>{
  let id = req.params.id;
  let data = {username,password} = req.body;
  return new User()
  .where({id:id})
  .save(data,{patch:true})
  .then(user => {
    return res.json(user);
  })
  .catch(err => {
    console.log({ err: err.message });
    return res.json({ err: err.message });
  })

})


router.route(`/`)
// Get all User
.get((req,res) => {
  return new User()
  .fetchAll()
  .then(users => {
    return res.json(users.toJSON());
  })
  .catch(err => {
    console.log({ err: err.message });
    return res.json({ err: err.message });
  })

})





module.exports = router;