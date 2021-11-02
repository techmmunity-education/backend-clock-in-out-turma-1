import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { exampleGetController } from "./example-get/example-get.controller";

// eslint-disable-next-line require-await
const exampleController: FastifyPluginAsync = async fastifyInstancePlugin => {
	fastifyInstancePlugin.get("/example-get", exampleGetController);
};

export const setExampleController = (
	fastify: FastifyInstance,
	apiVersion: string,
) =>
	fastify.register(exampleController, {
		prefix: `/${apiVersion}example`,
	});
