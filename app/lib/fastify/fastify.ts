import fastify, { FastifyInstance } from "fastify";
import { BaseLogger } from "pino";
import errorHandlerBuilder from 'app/lib/fastify/errorHandler.fastify';
import AppConfig from 'app/types/appConfig';


class fastifyStartup {

	private pino: BaseLogger;
	public fastify: FastifyInstance;


	private static logger: BaseLogger;
	private static staticInstance: fastifyStartup;

	constructor({ pino }: {
		pino: BaseLogger,
	}) {
		this.pino = pino;
		this.fastify = fastify({ logger: pino });
	}


	public static async create({ routers, config, logger }:
		{
			routers: Array<Function>,
			config: AppConfig,
			logger: BaseLogger,
		}) {
		// create logger
		if (!this.logger) this.logger = logger;

		// create fastify with logger
		if (!this.staticInstance) this.staticInstance = new fastifyStartup({ pino: this.logger });

		// create routers from builders
		routers.forEach(f => f({ fInst: this.staticInstance.fastify }));

		// create exception handlers
		const errorHandler = errorHandlerBuilder({ config })
		this.staticInstance.fastify.setErrorHandler(errorHandler);
		// TODO: set not found handler

		// listen
		await this.staticInstance.fastify.listen(config.http.port);

		return this.staticInstance;
	}
}

export default fastifyStartup;
