const bookshelf = require('./bookshelf');

class Recipe extends bookshelf.Model {
  get tableName(){
    return 'recipes'
  }
  cookbook(){
    return this.belongsTo('Recipe');
  }


}
module.exports = bookshelf.model('Recipe',Recipe)