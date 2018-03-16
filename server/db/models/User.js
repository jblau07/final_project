const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  get tableName() {
    return 'users'
  }

  users(){
    return this.belongsToMany('Ingredient').through('Fridge')
  }
  user(){
    return this.belongsToMany('Recipe').through('Cookbook');
  }

  cookbook(){
    return this.hasOne('Cookbook');
  }

  // ingredients(){
  //   return this.hasMany('Ingredient');
  // }
 
  // fridge(){
  //   return this.hasOne('Fridge');
  // }
  // cookbook(){
  //   return this.hasOne('Cookbook');
  // }



}
module.exports = bookshelf.model('User', User);