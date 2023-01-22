const config = {

	http: {
		port: 3120,
	},
	log: {
		logLevel: 'info',
		logEnabled: true
	},
	errors: {
		defaultStatus: 500,
		defaultMessage: 'Technical Error occurred.',
		defaultName: 'Unknown'
	}

};

export { config };
