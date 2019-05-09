'use strict';
require ('dotenv').config();
const ArticlesService = require('./article-service.js');

const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.TEST_DB_CONNECTION,
  debug: true,
});

// knexInstance('blogful_articles')
//   .insert({
//     title: 'First test post!',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
//   }).then(console.log);


// knexInstance
//   .select('*')
//   .from('blogful_articles')
//   .then(console.log);

//console.log(ArticlesService.getAllArticles());


knexInstance('blogful_articles')
  .insert({title: 'Slaughterhouse Five'})
  .returning('id')
  .then(console.log);