import pino from 'pino';

class PinoLogger {
	public static instance;
	static create({ config }) {
		this.instance = pino({
			name: `${config.app.name} (${config.app.version})`,
			level: config.log.loglevel || 'debug',
			enabled: config.log.logEnabled,
		});
		return this.instance;
	}
}

export default PinoLogger;
