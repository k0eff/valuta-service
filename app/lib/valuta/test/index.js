'use strict';

const Valuta = require('../lib/Valuta');

const OpenExchange = require('../sources/open-exchange');

const valuta = new Valuta(new OpenExchange());

(async () => {
	const rec = (await valuta.record('2018-08-20', 'EUR', 22)).toObject();
	const recbgn = (await valuta.record('2018-08-20', 'BGN', 200)).toObject();

	const re = rec.toObject();
	const pl = rec.plus(recbgn);
	const t = pl.valueMinus({ value: 10, currency: 'BGN' }).toObject();

	console.log('stop');
})();
