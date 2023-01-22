'use strict';

const {
	Amount,
	AmountDeferred,
} = require('./Amount');

const Record = require('./Record');

const mongoose = require('./dbSchemas/mongoose');
const elasticsearch = require('./dbSchemas/elasticsearch');

const tools = require('./tools');

const schemas = {
	mongoose,
	elasticsearch,
};

class Valuta {
	constructor(adaptor) {
		this._adaptor = adaptor;
		this.Amount = Amount;
		this.Record = Record;
		this.schemas = schemas;
		this.tools = tools;
	}

	async record(date, currency, value) {
		return Record.create(this._adaptor, {
			date, currency, value,
		});
	}

	amount(obj) { // eslint-disable-line
		if (obj instanceof Amount)
			return obj;
		return new AmountDeferred(obj);
	}
}

module.exports = Valuta;
