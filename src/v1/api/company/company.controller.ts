import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { registerController } from "./register/register.controller";

// eslint-disable-next-line require-await
const companyController: FastifyPluginAsync = async fastifyInstancePlugin => {
	fastifyInstancePlugin.post("/register", registerController);
};

export const setCompanyController = (
	fastify: FastifyInstance,
	apiVersion: string,
) =>
	fastify.register(companyController, {
		prefix: `/${apiVersion}/company`,
	});
