exports.up = function(knex, Promise) {
  return knex.schema.createTable('cookbook', (table)=> {
    table.integer('user_id').references('id').inTable('users');
    table.integer('recipe_id').references('id').inTable('recipes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cookbook');
};
