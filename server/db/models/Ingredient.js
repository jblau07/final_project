const bookshelf = require('./bookshelf');

class Ingredient extends bookshelf.Model{
  get tableName(){
    return 'ingredients'
  }

  users(){
    return this.belongsTo('User');
  }

  fridge(){
    return this.belongsTo('Fridge');
  }

}

module.exports = bookshelf.model('Ingredient',Ingredient)