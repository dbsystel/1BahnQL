'use strict';

class Product {

  constructor(payload) {
    this.name = payload.name;
    this.number = payload.nr;
    this.class = payload.class;
    this.productCode = payload.productCode;
    this.productName = payload.productName;
  }

}

module.exports = Product;

/*
      product: {
        name: 'S 42',
        nr: 42,
        class: 16,
        productCode: 4,
        productName: 's'
      }
 */
