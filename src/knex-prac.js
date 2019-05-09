'use strict';
const knex = require('knex');
require('dotenv').config();

const knexInstance = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION
});

// const searchTerm = 'the'
// knexInstance
//   .select('id', 'name', 'price', 'checked', 'category')
//   .from('shopping_list')
//   .where('name', 'ilike', `%${searchTerm}%`)
//   .then(console.log)

// const page = 3;
// function paginator(page){
//   const resultsPerPage = 6;
//   const offset = resultsPerPage * (page - 1);

//   knexInstance
//     .select('id', 'name', 'price', 'checked', 'category')
//     .from('shopping_list')
//     .limit(6)
//     .offset(offset)
//     .then(console.log)
// }
// paginator(page);


// function created(daysAgo){

//   knexInstance
//   .select('id', 'name', 'price', 'date_added')
//   .from('shopping_list')
//   .where('date_added', '>', knexInstance.raw(`now() - '?? days' ::INTERVAL`, daysAgo))
//   .then(console.log);
// }
// created(3);




// knexInstance
//   .select('category')
//   .sum('price')
//   .from('shopping_list')
//   .groupBy('category')
//   .then(console.log);