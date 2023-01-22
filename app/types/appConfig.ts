interface AppConfig {
	app: {
		name: string,
		version: string
	},
	http: {
		port: number
	},
	log: {
		logLevel: string,
		logEnabled: boolean
	},
	errors: {
		defaultStatus: number,
		defaultMessage: string,
		defaultName: string,
	}
}

export default AppConfig;
