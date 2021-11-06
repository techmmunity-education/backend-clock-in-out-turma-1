import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { loginController } from "./login/login.controller";

// eslint-disable-next-line require-await
const employeeController: FastifyPluginAsync = async fastifyInstancePlugin => {
	fastifyInstancePlugin.post("/login", loginController);
};

export const setEmployeeController = (
	fastify: FastifyInstance,
	version: string,
) =>
	fastify.register(employeeController, {
		prefix: `/${version}/employee`,
	});
