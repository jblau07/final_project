const bookshelf = require('./bookshelf');

class Cookbook extends bookshelf.Model{
  get tableName(){
    return 'cookbook'
  }

  users(){
    return this.belongsTo('User');
  }

  recipes(){
    return this.belongsTo('Recipe');
  }

}
module.exports = bookshelf.model('Cookbook',Cookbook);