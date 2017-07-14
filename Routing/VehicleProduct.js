'use strict';

class VehicleProduct {

  constructor(payload) {
    this.name = payload.name;
    this.number = payload.nr;
    this.class = payload.class;
    this.productCode = payload.productCode;
    this.productName = payload.productName;
  }

}

module.exports = Product;
