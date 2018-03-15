
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fridge', (table)=> {
    table.integer('user_id').references('id').inTable('users');
    table.integer('ingredient_id').references('id').inTable('ingredients');
    table.boolean('selected').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fridge');
};