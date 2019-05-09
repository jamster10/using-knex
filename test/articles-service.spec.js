'use strict';
/*global expect*/

const ArticlesService = require('../src/article-service');
const knex = require('knex');


let testArticles = [
  {
    id: 1,
    title: 'First test post!',
    date_published: new Date('2029-01-22T16:28:32.615Z'),
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
  },
  {
    id: 2,
    title: 'Second test post!',
    date_published: new Date('2100-05-22T16:28:32.615Z'),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'
  },
  {
    id: 3, 
    title: 'Third test post!',
    date_published: new Date('1919-12-22T16:28:32.615Z'),
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.'
  },
];
 
describe.skip('Articles service object', () => {
  let db;
  
  before( () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_CONNECTION,
    });
  });
  
  before(() => db('blogful_articles').truncate());

  after( () => {
    db.destroy();
  });

  //afterEach(() => db('blogful_articles').truncate());

  context('Given data in th DB', () => {  

    before( ()=>{
      return db
        .returning('title')
        .into('blogful_articles')
        .insert(testArticles);
    });

    it('getAllArticles(), resolves all articles from "blogful_articles" table', () => {
      //test that we got all the data
      return ArticlesService.getAllArticles(db)
        .then(actual => {
          expect(actual).to.eql(testArticles);
        });
    });

    it('getById() resolves an article by id from \'blogful_articles\' table', () => {
      const thirdId = 3;
      const thirdTestArticle = testArticles[thirdId - 1];
      return ArticlesService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            title: thirdTestArticle.title,
            content: thirdTestArticle.content,
            date_published: thirdTestArticle.date_published,
          });
        });
    });
  });

  

  context('Given "blogful_articles" has no data', () => {
    
    it('getAllArticles() resolves an empty array', () => {
      return ArticlesService.getAllArticles(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });
    before(() => db('blogful_articles').truncate());

    it('insertArticle() inserts an article and resolves the article with an "id"', () => {
      const newArticle = {
        title: 'Test new title',
        content: 'Test new content',
        date_published: new Date('2020-01-01T00:00:00.000Z'),
      };
      return ArticlesService.insertArticle(db, newArticle)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            title: newArticle.title,
            content: newArticle.content,
            date_published: newArticle.date_published,
          });
        });
    });
  });
});