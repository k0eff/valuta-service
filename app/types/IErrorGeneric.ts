interface IErrorGeneric {
	message: string,
	status?: number,
	code?: string,
	name?: string
	payload?: object
}

export default IErrorGeneric;
