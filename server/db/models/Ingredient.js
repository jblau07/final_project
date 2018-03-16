const bookshelf = require('./bookshelf');

class Ingredient extends bookshelf.Model{
  get tableName(){
    return 'ingredients'
  }

  ingredients(){
    return this.belongsToMany('User').through('Fridge')
  }



  users() {
    return this.belongsTo('User')
  }

  // users(){
  //   return this.belongsTo('User');
  // }
 
  // fridge(){
  //   return this.belongsTo('Fridge');
  // }
}

module.exports = bookshelf.model('Ingredient',Ingredient)