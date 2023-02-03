/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('coupon').del()
  await knex('coupon').insert([
    {id: 1, code: '17agustus', description: 'Diskon promo 17 Agustus'},
    {id: 2, code: 'ramadhan23', description: 'Diskon jelang ramadhan'},
  ]);
};
