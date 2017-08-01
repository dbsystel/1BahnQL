class VehicleProduct {
  constructor(payload) {
    console.log(payload)
    this.name = payload.name;
    this.class = payload.class;
    this.productCode = payload.productCode;
    this.productName = payload.product;
  }
}

module.exports = VehicleProduct;
