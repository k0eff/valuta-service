import AppConfig from 'app/types/appConfig';
import IErrorGeneric from 'app/types/IErrorGeneric';

const errorHandlerBuilder = ({ config }:
	{ config: AppConfig }) =>
	(error: IErrorGeneric, req, rep) => {
		let { status, message, name, code, payload } = error;

		if (!status) status = config.errors.defaultStatus;
		if (!message) message = config.errors.defaultMessage;
		if (!name) name = config.errors.defaultName;
		if (!code) code = `E${name}`;
		if (!payload) payload = {};

		rep.status(status).send({
			success: false,
			error: {
				status,
				message,
				name,
				code,
				payload
			}
		});

	};

export default errorHandlerBuilder;
