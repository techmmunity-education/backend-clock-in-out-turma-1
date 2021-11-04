import { FastifyInstance } from "fastify";
import { setCompanyController } from "./api/company/company.controller";
import { setExampleController } from "./api/example/example.controller";
import { API_VERSION } from "./config";

export const setV1Controller = (fastify: FastifyInstance) => {
	setExampleController(fastify, API_VERSION);
	setCompanyController(fastify, API_VERSION);
};
