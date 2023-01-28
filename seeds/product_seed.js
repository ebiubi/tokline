/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    {id: 1, title: 'Title Produk 1', description: 'Deskripsi Produk 1', image: 'https://placeimg.com/480/480/tech', price: 30000},
    {id: 2, title: 'Title Produk 2', description: 'Deskripsi Produk 2', image: 'https://placeimg.com/480/480/tech', price: 70000},
    {id: 3, title: 'Title Produk 3', description: 'Deskripsi Produk 3', image: 'https://placeimg.com/480/480/tech', price: 50000},
  ]);
};
