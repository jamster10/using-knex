'use strict';

require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.URL_SHOPPING_LIST_TEST,
  debug: true
});

// knexInstance
//   .select('*')
//   .from('shopping_list')
//   .then(console.log);


knexInstance
  .insert( { id: '9', name: 'test product 3', date_added: new Date('2020-01-01T00:02:21.000Z'), checked: true, category: 'Breakfast', price: '30.00'
  }).into('shopping_list')
  .returning('*')
  .then(console.log);