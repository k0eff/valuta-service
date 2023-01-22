'use strict';

const { currencies } = require('../../../currencies');

const mapping = currencies.reduce((s, c) => {
	s.properties[c] = {
		type: 'scaled_float',
		scaling_factor: 100,
	};
	return s;
}, {
	properties: {},
});

module.exports = () => mapping;
