import { getRepository } from "typeorm";
import { Route } from "types/route";
import { StatusCodeEnum } from "v1/enum/status-code";
import { getToken } from "v1/utils/jwt/get-token";
import { getUserData } from "v1/utils/jwt/get-user-data";
import { EmployeeEntity } from "../employee.entity";
import { editEmployee } from "./edit.service";
import { validation } from "./edit.validation";

export const editController: Route = async (request, reply) => {
	const token = getToken(request);
	const { employeeRole } = getUserData(token);

	const params = {
		...(request.body as any),
		id: (request.params as any).id,
		userRole: employeeRole,
	};

	try {
		const validatedParams = await validation(params);

		const employeeRepository = getRepository(EmployeeEntity);

		await editEmployee({ employeeRepository }, validatedParams);
	} catch (err: any) {
		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.status(StatusCodeEnum.NO_CONTENT).send();
};
