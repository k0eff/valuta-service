'use strict';

// const { Decimal } = require('decimal.js');
const { Decimal } = require('app/lib/valuta/lib/Decimal');


const { mappedCurrencies, currencies } = require('./currencies');

const operation = (left = {}, right = {}, op) => Object.entries(left).reduce((result, [currency, dec]) => {
	if (currency in mappedCurrencies && currency in right)
		result[currency] = dec[op](right[currency]);
	return result;
}, {});


const currencyBasedOperation = (valuta, { value, currency }, op) => {
	const valutaCurrency = valuta[currency];
	// const amountDecimal = new Decimal(value);
	const percentage = new Decimal(value).dividedBy(valutaCurrency);

	if (percentage.equals(0) && op === 'minus')
		return null; // empty

	return Object.entries(valuta).reduce((result, [cur, dec]) => {
		result[cur] = dec[op](dec.times(percentage));
		return result;
	});
};

const currencyBasedDelta = (valuta, { value, currency }) => {
	const valutaCurrency = valuta[currency];
	const percentage = new Decimal(value).dividedBy(valutaCurrency);

	if (percentage.equals(1))
		return valuta;

	if (percentage.equals(0))
		return null; // empty

	return Object.entries(valuta).reduce((result, [cur, dec]) => {
		result[cur] = dec.times(percentage);
		return result;
	}, {});
};

class Amount {
	constructor(rates) {
		Object.entries(rates).forEach(([currency, value]) => {
			if (currency in mappedCurrencies)
				this[currency] = Decimal.isDecimal(value) ? value : new Decimal(value);
		});
	}

	valueAmount({ value, currency }) {
		const res = currencyBasedDelta(this, { value, currency });
		return new Amount(res || Amount.emptyObject);
	}

	valueMinus({ value, currency }) {
		const res = currencyBasedOperation(this, { value, currency }, 'minus');
		return new Amount(res || Amount.emptyObject);
	}

	valueEquals({ value, currency }) {
		return this[currency].equals(value);
	}

	valuePlus({ value, currency }) {
		const res = currencyBasedOperation(this, { value, currency }, 'plus');
		return new Amount(res || Amount.emptyObject);
	}

	plus(valuta) {
		return new Amount(operation(this, valuta, 'plus'));
	}

	minus(valuta) {
		return new Amount(operation(this, valuta, 'minus'));
	}

	times(valuta) {
		return new Amount(operation(this, valuta, 'times'));
	}

	toObject(dp = 2) {
		const result = {};
		Object.entries(this).forEach(([currency, dec]) => {
			if (currency in mappedCurrencies)
				result[currency] = dec.toDP(dp).toNumber();
		});
		return result;
	}

	toJSON() {
		return this.toObject();
	}

	nullCurrency(currency) {
		if (this[currency])
			this[currency] = new Decimal(0);
	}
}

class AmountDeferred {
	constructor(rates) {
		Object.assign(this, rates);
	}

	valueAmount({ value, currency }) {
		return new Amount(this).valueAmount({ value, currency });
	}

	valueMinus({ value, currency }) {
		return new Amount(this).valueMinus({ value, currency });
	}

	valuePlus({ value, currency }) {
		return new Amount(this).valuePlus({ value, currency });
	}

	valueEquals({ value, currency }) {
		return this[currency] === value;
	}

	plus(valuta) {
		return new Amount(this).plus(valuta);
	}

	minus(valuta) {
		return new Amount(this).minus(valuta);
	}

	times(valuta) {
		return new Amount(this).times(valuta);
	}

	toObject(dp = 2) {
		return this;
	}

	toJSON() {
		return this.toObject();
	}
}

Amount.emptyObject = currencies.reduce((m, c) => {
	m[c] = 0;
	return m;
}, {});

Amount.empty = new Amount(Amount.emptyObject);

module.exports = {
	Amount,
	AmountDeferred,
};
