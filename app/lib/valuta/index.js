'use strict';

const Valuta = require('./lib/Valuta');
const OpenExchange = require('./sources/open-exchange');

module.exports = new Valuta(new OpenExchange());
