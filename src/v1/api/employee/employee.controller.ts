import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { RoleTypeEnum } from "v1/enum/role-types";
import { setAuthorizationMiddleware } from "v1/common/middlewares/authorization";
import { listByPageController } from "./list-by-page/list-by-page.controller";
import { loginController } from "./login/login.controller";
import { editController } from "./edit/edit.controller";
import { employeeRegisterController } from "./register/register.controller";

// eslint-disable-next-line require-await
const employeeController: FastifyPluginAsync = async fastifyInstancePlugin => {
	fastifyInstancePlugin.post("/login", loginController);
};

const authEmployeeController: FastifyPluginAsync =
	// eslint-disable-next-line require-await
	async fastifyInstancePlugin => {
		fastifyInstancePlugin.register(
			setAuthorizationMiddleware([
				RoleTypeEnum.MANAGER,
				RoleTypeEnum.HUMAN_RESOURCES,
			]),
		);
		fastifyInstancePlugin.get("/list-by-page", listByPageController);
		fastifyInstancePlugin.put("/edit/:id", editController);
		fastifyInstancePlugin.post("/register", employeeRegisterController);
	};

export const setEmployeeController = (
	fastify: FastifyInstance,
	version: string,
) => {
	fastify.register(employeeController, {
		prefix: `/${version}/employee`,
	});
	fastify.register(authEmployeeController, {
		prefix: `/${version}/employee`,
	});
};
