import { FastifyRequest } from "fastify";

export const tokenManipulation = (request: FastifyRequest) => {
	const { authorization } = request.headers;

	return authorization!.replace("Bearer ", "");
};
