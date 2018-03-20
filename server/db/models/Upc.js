const bookshelf = require("./bookshelf");

class Upc extends bookshelf.Model {
  get tableName() {
    return "upc";
  }
}
module.exports = bookshelf.model("Upc", Upc);
