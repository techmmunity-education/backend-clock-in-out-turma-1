import {
	FastifyInstance,
	HookHandlerDoneFunction,
	onRequestHookHandler,
} from "fastify";
import fp from "fastify-plugin";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { verify } from "v1/utils/jwt/verify";

export const authorizationMiddleware =
	(roles: Array<RoleTypeEnum>): onRequestHookHandler =>
	(request, reply, done) => {
		const { authorization } = request.headers;

		if (!authorization) {
			const x = reply
				.status(StatusCodeEnum.FORBIDDEN)
				.send({ error: "authorization is a required header" });

			return x;
		}

		if (!authorization.startsWith("Bearer ")) {
			return reply
				.status(StatusCodeEnum.FORBIDDEN)
				.send({ error: "Invalid token pattern" });
		}

		const token = authorization.replace("Bearer ", "");

		const tokenPayload = verify(token);

		if (tokenPayload === false) {
			return reply
				.status(StatusCodeEnum.FORBIDDEN)
				.send({ error: "Invalid token" });
		}

		if (!roles.includes(tokenPayload.employeeRole)) {
			return reply
				.status(StatusCodeEnum.UNAUTHORIZED)
				.send({ error: "Access denied" });
		}

		done();
	};

export const setAuthorizationMiddleware = (roles: Array<RoleTypeEnum>) =>
	fp(
		(
			fastify: FastifyInstance,
			_options: any,
			done: HookHandlerDoneFunction,
		) => {
			fastify.addHook("onRequest", authorizationMiddleware(roles));

			done();
		},
	);
