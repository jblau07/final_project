
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', (table)=> {
    table.increments();
    table.string('name').notNullable();
    table.string('ingredients');
    table.string('url').notNullable();
    table.string('image');
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes');
};
