import { FastifyInstance } from "fastify";
import { setCompanyController } from "./api/company/company.controller";
import { setUserController } from "./api/user/user.controller";
import { API_VERSION } from "./config";

export const setV1Controller = (fastify: FastifyInstance) => {
	setCompanyController(fastify, API_VERSION);
	setUserController(fastify);
};
