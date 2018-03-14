const bookshelf = require('./bookshelf');

class Recipe extends bookshelf.Model{
  get tableName(){return 'recipes'}

  users(){
    return this.belongsTo('User');
  }
}

module.exports = bookshelf.Model('Recipe',Recipe);