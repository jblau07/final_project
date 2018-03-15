
exports.up = function (knex, Promise) {
  return knex.schema.table('cookbook', (table) => {
    table.increments('id');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.table('cookbook', table => {
    table.dropColumn('id');
  })
};
