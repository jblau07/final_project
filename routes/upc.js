const express = require("express");
const router = express.Router();
const Upc = require("../server/db/models/Upc");

router.route("/").post((req, res) => {
  let upc = req.body.new;
  console.log(req.body.new);
  return new Upc()
    .where({ upc_code: upc })
    .fetch()
    .then(upc => {
      return res.json(upc.toJSON());
    })
    .catch(err => {
      console.log({ err: err.message });
      return res.json({ err: err.message });
    });
});

module.exports = router;
