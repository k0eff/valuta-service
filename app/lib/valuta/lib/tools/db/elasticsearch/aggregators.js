'use strict';

const { currencies } = require('../../../currencies');

const stats = (field, aggregator = `agg_${field}`) => currencies.reduce((a, c) => {
	a[`${aggregator}.${c}`] = {
		stats: {
			field: `${field}.${c}`,
		},
	};
	return a;
}, {});

module.exports = {
	stats,
};
