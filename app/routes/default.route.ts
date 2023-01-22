import * as schema2xx from 'app/serialization/2xx.response.schema';


const indexHandler = ({ fInst }) => async (req, reply) => {
	reply.status(200).send({
		success: true,
		payload: {
			routes: fInst.printRoutes(),
		},
	})
};

const builder = ({
	fInst //fastify instance
}) => {

	fInst.get('/', { schema: schema2xx }, indexHandler({ fInst }));

};



export default builder;
