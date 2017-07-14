class OperationLocation {
  constructor(operationLocation) {
	this.id = operationLocation.id;
    this.abbrev = operationLocation.abbrev;
    this.name = operationLocation.name;
    this.shortName = operationLocation.short;
    this.type = operationLocation.type;
    this.status = operationLocation.status;
    this.locationCode = operationLocation.locationCode;
    this.UIC = operationLocation.UIC;
    this.regionId = operationLocation.regionId;
    this.validFrom = operationLocation.validFrom;
    this.validTill = operationLocation.validTill;
    this.timeTableRelevant = operationLocation.timeTableRelevant;
    this.borderStation = operationLocation.borderStation;
  }
}

module.exports = OperationLocation;
