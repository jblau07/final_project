const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./db/models/User");
const PORT = process.env.PORT || 8081;

const userRoute = require('./routes/users');
const ingredientsRoute = require('./routes/ingredients');
const recipeRoute = require('./routes/recipes');
const fridgeRoute = require('./routes/fridge');
const cookbookRoute = require('./routes/cookbook');
const imageCaptureRoute = require('./routes/imageCapture');
const upcRoute = require("./routes/upc");

const app = express();
app.use(bodyParser.json({ limit: '50MB' }));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/users',userRoute);
app.use('/api/ingredients',ingredientsRoute);
app.use('/api/recipes',recipeRoute);
app.use('/api/fridge',fridgeRoute);
app.use('/api/cookbook',cookbookRoute);
app.use('/api/image-capture', imageCaptureRoute);
app.use("/api/upc", upcRoute);

app.post("/api/register", (req, res) => {
  let data = ({ username, password } = req.body);

  return new User(data)
    .save()
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      return res.json({ message: err.message });
    });
});

app.post("/api/login", (req, res) => {
  let data = ({ username, password } = req.body);

  return new User({ username: username, password: password })
    .fetch()
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      return res.json({ message: err.message });
    });
});

app.get(`/api/logout`, (req, res) => {
  if (!req.user) {
    return res.status(200).json({
      logout: true
    });
  } else {
    return res.status(401).json({
      error: "User is still logged in",
      logout: false
    });
  }
});

app.get(`/`, (req, res) => {
  res.send("SMOKE TEST :D");
});

app.get('/*', (req,res)=> {
  var options = {
    root: __dirname + '../public',
  };
  res.sendFile('index.html',options);
})



app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
