import { FastifyRequest, FastifyReply } from 'fastify';
import valutaLib from 'app/lib/valuta';
import IValutaResponse from 'app/types/IValutaResponse';
import { valutaResponseSchema } from 'app/serialization/valuta.response.schema'

const valEmptyObj = valutaLib.Amount.emptyObject

const helpers = {
	op: (req: FastifyRequest, rep: FastifyReply<IValutaResponse>, { op }: { op: string }) => { // TODO: define valuta response type
		const { current } = req.body;
		let { prev } = req.body;
		if (prev === null) prev = valEmptyObj;
		const nextValue = new valutaLib.Amount(prev)[op](current).toObject();


		rep.send({ result: nextValue });
	},
}

const handlers = {
	plus: async (req: FastifyRequest, rep: FastifyReply<IValutaResponse>) => helpers.op(req, rep, { op: 'plus' }),
	minus: async (req: FastifyRequest, rep: FastifyReply<IValutaResponse>) => helpers.op(req, rep, { op: 'minus' }),  // TODO: define valuta response type
	times: async (req: FastifyRequest, rep: FastifyReply<IValutaResponse>) => helpers.op(req, rep, { op: 'times' }),  // TODO: define valuta response type
	empty: async (req: FastifyRequest, rep: FastifyReply<IValutaResponse>) => rep.send({ result: valEmptyObj }),
	record: async (req: FastifyRequest, rep: FastifyReply<IValutaResponse>) => {
		const { date, currency, value } = req.body;
		const result = (await valutaLib.record(date, currency, value)).toObject();
		rep.send({ result });
	},
};

const routeBuilder = ({ fInst }) => {
	fInst.post('/valuta/plus', { schema: { response: { 200: valutaResponseSchema } } }, handlers.plus);
	fInst.post('/valuta/minus', { schema: { response: { 200: valutaResponseSchema } } }, handlers.minus);
	fInst.post('/valuta/times', { schema: { response: { 200: valutaResponseSchema } } }, handlers.times);
	fInst.get('/valuta/empty', { schema: { response: { 200: valutaResponseSchema } } }, handlers.empty);
	fInst.post('/valuta/record', { schema: { response: { 200: valutaResponseSchema } } }, handlers.record);
};

export default routeBuilder;
