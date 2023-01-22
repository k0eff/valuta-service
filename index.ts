import * as amp from 'app-module-path'; amp.addPath(__dirname); // cwd(__dirname)


import fastify from "fastify";
import pkg from 'package.json';
import defaultRouteBuilder from "./app/routes/default.route";
import valutaRouteBuilder from "./app/routes/valuta.route";
import ExceptionHandler from 'app/utils/process/exceptionHandler';
import CfgLoader from 'app/utils/config/configLoader';
import fastifyBuilder from 'app/lib/fastify/fastify';
import PinoLogger from 'app/lib/log/logger';


const App = (async () => {
	const PATH = __dirname;
	const config = CfgLoader.getConfig({
		app: { PATH },
		env: process.env.NODE_ENV || 'debug',
		injected: {
			app: {
				name: pkg.name,
				version: pkg.version
			}
		}
	});

	const routers = [
		defaultRouteBuilder,
		valutaRouteBuilder
	];

	const pino = PinoLogger.create({ config });

	const app = {
		name: pkg.name,
		version: pkg.version,
		PATH,
		config,
		// fastify: fastify({ logger: true }),
		fastify: fastifyBuilder.create({ routers, config, logger: pino }),
	};



	// register unhandled exception handler
	ExceptionHandler.getInstance({ app, logger: pino })

})();


