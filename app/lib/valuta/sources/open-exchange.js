'use strict';

// const { Decimal } = require('decimal.js');
const { Decimal } = require('app/lib/valuta/lib/Decimal');


const { currencies } = require('../lib/currencies');

class Rates {
	constructor({ base, rates, timestamp }) {
		this.base = base;
		this.rates = {};
		this.currency = base;
		this.date = new Date(timestamp * 1000);
		currencies.forEach((cur) => {
			this.rates[cur] = rates[cur];
		});
	}

	async getRate(currency, amount) {
		if (!currency || !(currency in this.rates))
			throw new Error('Currency not supported');

		if (currency === this.currency)
			return this;

		if (amount || amount === 0)
			amount = new Decimal(amount);

		const thisRate = this.rates[currency];

		const rate = {
			date: this.date,
			base: this.base,
			currency,
			rates: {},
			values: {},
		};

		currencies.forEach((cur) => {
			const curRate = new Decimal(this.rates[cur]).dividedBy(thisRate);
			rate.rates[cur] = curRate.toDP(4).toNumber();
			if (amount)
				rate.values[cur] = amount.times(curRate);
		});

		return rate;
	}
}

const response = {
	timestamp: 1534158000,
	base: 'USD',
	rates: {
		AED: 3.673281,
		AFN: 72.416074,
		ALL: 110.51,
		AMD: 481.746118,
		ANG: 1.844888,
		AOA: 259.713,
		ARS: 29.228,
		AUD: 1.37499,
		AWG: 1.792751,
		AZN: 1.7025,
		BAM: 1.716563,
		BBD: 2,
		BDT: 85.015678,
		BGN: 1.718868,
		BHD: 0.37715,
		BIF: 1786,
		BMD: 1,
		BND: 1.510913,
		BOB: 6.951024,
		BRL: 3.858187,
		BSD: 1,
		BTC: 0.000154533047,
		BTN: 68.862608,
		BWP: 10.581503,
		BYN: 2.043758,
		BZD: 2.009903,
		CAD: 1.315761,
		CDF: 1616,
		CHF: 0.9947,
		CLF: 0.02338,
		CLP: 654.2,
		CNH: 6.89067,
		CNY: 6.8833,
		COP: 2934.198696,
		CRC: 570.878798,
		CUC: 1,
		CUP: 25.5,
		CVE: 97.0995,
		CZK: 22.55638,
		DJF: 178.05,
		DKK: 6.550406,
		DOP: 49.76,
		DZD: 118.96,
		EGP: 17.8943,
		ERN: 15.001133,
		ETB: 27.755,
		EUR: 0.878654,
		FJD: 2.110003,
		FKP: 0.784275,
		GBP: 0.784275,
		GEL: 2.44699,
		GGP: 0.784275,
		GHS: 4.85,
		GIP: 0.784275,
		GMD: 48.07,
		GNF: 9100,
		GTQ: 7.493084,
		GYD: 210.124712,
		HKD: 7.8499,
		HNL: 24.039989,
		HRK: 6.528,
		HTG: 67.158924,
		HUF: 285.223001,
		IDR: 14350.714083,
		ILS: 3.708745,
		IMP: 0.784275,
		INR: 69.895428,
		IQD: 1191,
		IRR: 43166.89868,
		ISK: 109.159904,
		JEP: 0.784275,
		JMD: 135.788245,
		JOD: 0.709603,
		JPY: 110.3785,
		KES: 100.74,
		KGS: 68.137481,
		KHR: 4070,
		KMF: 432.151291,
		KPW: 900,
		KRW: 1135.63,
		KWD: 0.30347,
		KYD: 0.83845,
		KZT: 359.39522,
		LAK: 8467.5,
		LBP: 1510.05,
		LKR: 160.04,
		LRD: 153.000051,
		LSL: 14.07,
		LYD: 1.38,
		MAD: 9.5502,
		MDL: 16.49494,
		MGA: 3305,
		MKD: 54.103092,
		MMK: 1469.89936,
		MNT: 2442.166667,
		MOP: 8.134534,
		MRO: 356,
		MRU: 35.95,
		MUR: 34.83,
		MVR: 15.400001,
		MWK: 727.292508,
		MXN: 19.263,
		MYR: 4.0995,
		MZN: 57.900027,
		NAD: 14.07,
		NGN: 360.5,
		NIO: 31.98,
		NOK: 8.37773,
		NPR: 110.844947,
		NZD: 1.520597,
		OMR: 0.385005,
		PAB: 1,
		PEN: 3.281001,
		PGK: 3.31,
		PHP: 53.368914,
		PKR: 123.95,
		PLN: 3.78944,
		PYG: 5746.894027,
		QAR: 3.641082,
		RON: 4.095167,
		RSD: 103.689615,
		RUB: 68.162,
		RWF: 860,
		SAR: 3.750098,
		SBD: 7.88911,
		SCR: 13.591512,
		SDG: 18.05,
		SEK: 9.150505,
		SGD: 1.376549,
		SHP: 0.784275,
		SLL: 6542.71,
		SOS: 577.5,
		SRD: 7.458,
		SSP: 130.2634,
		STD: 21050.59961,
		STN: 21.45,
		SVC: 8.803181,
		SYP: 515.04999,
		SZL: 14.08,
		THB: 33.41,
		TJS: 9.478122,
		TMT: 3.499986,
		TND: 2.768598,
		TOP: 2.310538,
		TRY: 6.916042,
		TTD: 6.78106,
		TWD: 30.84237,
		TZS: 2282.3,
		UAH: 27.239393,
		UGX: 3731.9849,
		USD: 1,
		UYU: 30.701802,
		UZS: 7807.5,
		VEF: 141572.666667,
		VND: 23116.095172,
		VUV: 108.499605,
		WST: 2.588533,
		XAF: 576.358948,
		XAG: 0.06585241,
		XAU: 0.00083243,
		XCD: 2.70255,
		XDR: 0.715744,
		XOF: 576.358948,
		XPD: 0.00101,
		XPF: 104.851259,
		XPT: 0.00123078,
		YER: 250.300682,
		ZAR: 14.435723,
		ZMW: 9.999419,
		ZWL: 322.355011,
	},
};


/*
got.get(`${BASE_URL}/historical/2018-08-13.json`, {
	query: {
		app_id: 'dfd45e616f094e518ce6e8e3e328fe',
	},
	json: true,
}).then(({
	body,
}) => {

}).catch((e) => {

});
*/

class OpenExchange {
	constructor(appID) {
		this._addId = appID;
	}

	getRate(date, currency, amount) { // eslint-disable-line
		const rate = new Rates(response);
		return Promise.resolve(rate.getRate(currency, amount));
	}
}

module.exports = OpenExchange;
