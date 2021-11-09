import { FastifyRequest } from "fastify";

export const getToken = (request: FastifyRequest) => {
	const { authorization } = request.headers;

	return authorization!.replace("Bearer ", "");
};
