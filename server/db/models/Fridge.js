const bookshelf = require('./bookshelf');

class Fridge extends bookshelf.Model{
  get tableName(){
    return 'fridge'
  }

  ingredients(){
   return this.hasMany('Ingredient');
  }
  users(){
    return this.belongsTo('User');
  }

}

module.exports = bookshelf.model('Fridge',Fridge);