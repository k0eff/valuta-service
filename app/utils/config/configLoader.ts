import { config as configDef } from 'config/config.default';
import { config as configDebug } from 'config/config.debug';
import { config as configProd } from 'config/config.production';



type ConfigType = Object;


class ConfigLoader {

	private static cache: Object = {};


	private static loadConfig({ app, env, injected }): ConfigType {
		const configEnv = env === 'production' ? configDebug : configProd;

		const config = {
			...injected,
			...configDef,
			...configEnv
		};
		return config;
	}

	public static getConfig({ app, env = 'debug', injected = {} }:
		{
			app: object,
			env: string,
			injected: object
		}) {
		const e: string = env;
		if (!this.cache[e]) this.cache[e] = this.loadConfig({ app, env: e, injected });
		return this.cache[e];
	}

}

export default ConfigLoader;
