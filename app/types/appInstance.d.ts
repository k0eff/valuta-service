import { FastifyInstance } from "fastify";

interface AppInstance {
	config: Object,
	fastify: FastifyInstance
}
export default AppInstance;
