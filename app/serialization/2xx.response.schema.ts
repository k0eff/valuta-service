import { RouteSchema } from "fastify";

const schema: RouteSchema = {
	response: {
		'2xx': {
			type: 'object',
			properties: {
				success: { type: 'boolean' },
				payload: { type: 'object' }
			}
		}
	}
}

export default schema;
