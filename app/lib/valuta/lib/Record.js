'use strict';

const {
	Amount,
} = require('./Amount');

class Record extends Amount {
	constructor({
		date,
		currency,
		...rates
	}) {
		super(rates);
		this.date = new Date(date);
		this.currency = currency;
	}

	static async create(
		adaptor,
		{
			date,
			currency,
			value,
		},
	) {

		const { values, date: exchangeDate } = await adaptor.getRate(date, currency, value);
		return new Record({
			date: exchangeDate,
			currency,
			...values,
		});
	}
}

module.exports = Record;
