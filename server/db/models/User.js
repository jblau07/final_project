const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  get tableName() {
    return 'users'
  }

  ingredients(){
    return this.hasMany('Ingredient');
  }

  fridge(){
    return this.hasOne('Fridge');
  }
  cookbook(){
    return this.hasOne('Cookbook');
  }



}
module.exports = bookshelf.model('User', User);