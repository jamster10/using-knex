'use strict';
/*global expect*/

const knex = require('knex');
require('dotenv').config();
const shoppingService = require('../src/shopping-service');

const testData = [
  { id: '1', name: 'test product 1', date_added: new Date('2020-01-01T00:00:00.000Z'), checked: false, category: 'Breakfast', price: '10.00'
  },
  { id: '2', name: 'test product 2', date_added: new Date('2020-01-01T00:00:21.000Z'), checked: true, category: 'Lunch', price: '20.00'
  },
  { id: '3', name: 'test product 3', date_added: new Date('2020-01-01T00:02:21.000Z'), checked: true, category: 'Breakfast', price: '30.00'
  }
];

describe('CRUD testing of "shoppingService"', () => {
  let db;
  before( ()=>{
    db = knex({
      client: 'pg',
      connection: process.env.URL_SHOPPING_LIST_TEST,
      debug: true
    });
  });

  beforeEach( () => {
    db.truncate('shopping_list');
  });

  after('Kill connection', () => {
    db.destroy();
  });

  context('Data already in DB', () => {
    
    before( () => {
      return db.truncate('shopping_list');
    });
    
    before( () => {
      return db.returning('id').insert(testData).into('shopping_list');
    });
    
    it('responds with all the data already in DB', () => {
      return shoppingService.getProducts(db)
        .then(res =>{
          expect (res).to.eql(testData);
        });
    });

    it('responds with right data when given an id', () => {
      return shoppingService.getProductById(db, 3)
        .then(res => {
          expect (res).eql(testData[2]);
        });
    });

    it('deletes correct item', () => {
      return shoppingService.deleteItemById(db, 3)
        .then(_ => shoppingService.getProducts(db))
        .then(res => {
          expect (res.length).to.eql(2);
        });
    });
    
    it.only('update correct item by Id', () => {

      const newId = 2;
      const newData = {
        name: 'updated title',
        checked: true,
      };

      return shoppingService.updateItemById(db, newId, newData)
        .then(_ => shoppingService.getProductById(db, 2))
        .then(res => {
          expect (res).to.eql({
            'category': 'Lunch',
            'checked': true,
            'date_added': '[Date: 2020-01-01T00:00:21.000Z]',
            'id': '2',
            'name': 'updated title',
            'price': '20.00'
          });
        });
    });
  });


  context('No data in DB', () => {

    beforeEach( () => {
      return db.truncate('shopping_list');
    });

    it('resolves adding a single item to the DB', () => {
      return shoppingService.addProductToDb(db, testData[2])
        .then(res => {
          expect(res).to.eql({id: '3', name: 'test product 3'});
        });
    });
  });
});
