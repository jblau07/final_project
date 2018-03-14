const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express();

app.get(`/`, (req,res) => {
res.send('SMOKE TEST :D');
})



app.listen(PORT,() =>{
  console.log(`Server is listening on ${PORT}`)
})