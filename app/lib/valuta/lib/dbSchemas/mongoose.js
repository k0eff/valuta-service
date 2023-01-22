'use strict';

const { currencies } = require('../currencies');

module.exports = Schema => currencies.reduce((s, c) => {
	s[c] = {
		type: Schema.Types.Decimal128,
	};
	return s;
}, {});
