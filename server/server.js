const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./db/models/User');
const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/api/register', (req, res) => {
  let data = {username, password} = req.body;

  return new User(data)
    .save()
    .then(user => {
      return res.json(user)
    })
    .catch(err => {
      return res.json({message: err.message})
    })
}
)

app.post('/api/login', (req, res) => {
  let data = {username, password} = req.body;

  return new User({username: username, password: password})
    .fetch()
    .then(user => {
      return res.json(user)
    })
    .catch(err => {
      return res.json({message: err.message})
    })
})

app.get(`/`, (req,res) => {
res.send('SMOKE TEST :D');
})

app.listen(PORT,() =>{
  console.log(`Server is listening on ${PORT}`)
})