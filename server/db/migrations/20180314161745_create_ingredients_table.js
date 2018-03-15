
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ingredients', (table)=> {
    table.increments();
    table.string('name').unique().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ingredients');
};