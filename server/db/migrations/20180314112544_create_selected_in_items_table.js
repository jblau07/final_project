
exports.up = function(knex, Promise) {
  return knex.schema.table('items', table => {
    table.boolean('selected').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('items', table => {
    table.dropColumn('selected')
  })
  
};
