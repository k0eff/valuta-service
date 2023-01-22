'use strict';

const currencies = [
	'JPY',
	'BGN',
	'CZK',
	'DKK',
	'GBP',
	'HUF',
	'PLN',
	'RON',
	'SEK',
	'CHF',
	'ISK',
	'NOK',
	'HRK',
	'RUB',
	'TRY',
	'AUD',
	'BRL',
	'CAD',
	'CNY',
	'HKD',
	'IDR',
	'ILS',
	'INR',
	'KRW',
	'MXN',
	'MYR',
	'NZD',
	'PHP',
	'SGD',
	'THB',
	'ZAR',
	'EUR',
	'USD',
];

const mappedCurrencies = currencies.reduce((m, c) => {
	m[c] = true;
	return m;
}, {});

module.exports = {
	currencies,
	mappedCurrencies,
};
