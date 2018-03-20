exports.up = function(knex, Promise) {
  return knex.schema.createTable("upc", function(table) {
    table.increments();
    table
      .string("upc_code")
      .notNullable()
      .unique();
    table.string("item_name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("upc");
};
