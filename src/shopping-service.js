'use strict';

const table = 'shopping_list';

const ShoppingService = {
  getProducts (db){
    return db.select('*').from(table);
  },

  getProductById(db, id){
    return db.select('*').from(table).where('id', id).first();
  },

  addProductToDb(db, newProduct){
    return db.insert(newProduct).into(table).returning(['id', 'name'])
      .then(res => res[0]);
  },

  deleteItemById(db, id){
    return db(table)
      .where({id})
      .delete();
  },
  
  updateItemById(db, id, newData){
    return db(table)
      .where({id})
      .update(newData);
  }
};

module.exports = ShoppingService;