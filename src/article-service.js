'use strict';

const ArticleService = {
  getAllArticles(knex){
    return knex.select('*').from('blogful_articles');
  },

  insertArticle(knex, newArticle) {
    return knex
      .insert(newArticle)
      .into('blogful_articles')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex.from('blogful_articles').select('*').then(console.log);
  }
};

module.exports = ArticleService;