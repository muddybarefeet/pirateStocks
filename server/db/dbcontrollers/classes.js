var classes = {};

var Search = function(name, symbol, ask){
  this.name = name;
  this.symbol = symbol;
  this.ask = ask;
};

var SingleStock = function (name, symbol, industry, sector, exchange, ask, percentChange, yearHigh, yearLow) {
  this.name = name;
  this.symbol = symbol;
  this.industry = industry;
  this.sector = sector;
  this.exchange = exchange;
  this.ask = ask;
  this.percentChange = percentChange;
  this.yearHigh = yearHigh;
  this.yearLow = yearLow;
};

classes.Search = Search;
classes.SingleStock = SingleStock;

module.exports = classes;