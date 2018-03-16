const bookshelf = require('./bookshelf');

class Ingredient extends bookshelf.Model{
  get tableName(){
    return 'ingredients'
  }

  ingredients(){
    return this.belongsToMany('User').through('Fridge')
  }
}

module.exports = bookshelf.model('Ingredient',Ingredient)