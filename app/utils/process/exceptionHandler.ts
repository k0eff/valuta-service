import AppInstance from 'app/types/appInstance';
import LoggerInstance from 'app/types/loggerInstance';

class ExceptionHandler {

	private app: AppInstance;
	private logger: LoggerInstance;

	private static instance: any;

	private constructor({ app, logger }) {
		this.app = app;
		this.logger = logger;
	}


	public handler(ex) {
		if (this.logger.fatal) this.logger.fatal({ msg: 'Unexpected exception occured.', err: ex });
		process.exit(1);
	}

	public registerHandler() {
		process.on('uncaughtException', this.handler.bind(this));
		process.on('unhandledRejection', this.handler.bind(this));
	}

	public static getInstance({ app, logger }) { // instantiate only once
		if (!this.instance) {
			this.instance = new ExceptionHandler({ app, logger });
			this.instance.registerHandler();
			return this.instance;
		}
		return this.instance;
	}
}

export default ExceptionHandler;
