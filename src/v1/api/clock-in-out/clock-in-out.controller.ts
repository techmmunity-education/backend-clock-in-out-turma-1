import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { createClockInOutController } from "./create/create-clock-in-out.controller";

const clockInOutController: FastifyPluginAsync =
	// eslint-disable-next-line require-await
	async fastifyInstancePlugin => {
		fastifyInstancePlugin.post("/create", createClockInOutController);
	};

export const setClockInOutController = (
	fastify: FastifyInstance,
	apiVersion: string,
) =>
	fastify.register(clockInOutController, {
		prefix: `/${apiVersion}/clock-in-out`,
	});
