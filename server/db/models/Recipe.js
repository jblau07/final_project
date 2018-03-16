const bookshelf = require('./bookshelf');

class Recipe extends bookshelf.Model {
  get tableName(){
    return 'recipes'
  }
  recipe(){
    return this.belongsToMany('User').through('Cookbook')
  }


}
module.exports = bookshelf.model('Recipe',Recipe)