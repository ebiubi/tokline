/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {id: 1, name: 'tshirt'},
    {id: 2, name: 'book'},
    {id: 3, name: 'marchendise'},
  ]);
};
