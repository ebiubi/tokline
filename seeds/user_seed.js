/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name:'Ismail Haniya', email: 'ismailhaniya@gmail.com', password: 'password', phone: '6285240008442'},

  ]);
};
