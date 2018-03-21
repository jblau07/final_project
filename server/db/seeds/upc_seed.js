exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("upc")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("upc").insert([
        { upc_code: "0051000000118", item_name: "Tomato Soup" },
        { upc_code: "0047325023178", item_name: "Elbow Macaroni" },
        { upc_code: "0033383660004", item_name: "Carrots" }
      ]);
    });
 };