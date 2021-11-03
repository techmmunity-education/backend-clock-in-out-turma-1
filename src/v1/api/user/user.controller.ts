import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { loginController } from "./login/login.controller";

// eslint-disable-next-line require-await
const userController: FastifyPluginAsync = async fastifyInstancePlugin => {
	fastifyInstancePlugin.get("/login", loginController);
};

export const setUserController = (fastify: FastifyInstance) =>
	fastify.register(userController, {
		prefix: "/user",
	});
