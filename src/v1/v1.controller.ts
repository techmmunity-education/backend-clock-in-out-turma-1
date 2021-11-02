import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { setExampleController } from "./api/example/example.controller";
import { API_VERSION } from "./config";

export const setV1Controller = (fastify: FastifyInstance) => {
	setExampleController(fastify, API_VERSION);
};
