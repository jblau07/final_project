
exports.up = function (knex, Promise) {
  return knex.schema.table('fridge', (table) => {
    table.increments('id');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.table('fridge', table => {
    table.dropColumn('id');
  })
};
