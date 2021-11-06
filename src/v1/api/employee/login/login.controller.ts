import { getRepository } from "typeorm";
import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "types/route";
import { EmployeeEntity } from "../employee.entity";
import { login } from "./login.service";
import { validation } from "./login.validation";

export const loginController: Route = async (request, reply) => {
	let result;

	try {
		const validatedParams = await validation(request.body as any);

		const employeeRepository = getRepository(EmployeeEntity);

		result = await login(
			{
				employeeRepository,
			},
			validatedParams,
		);
	} catch (err: any) {
		// eslint-disable-next-line no-console
		console.error(err);

		return reply.status(err.statusCode || StatusCodeEnum.INTERNAL).send({
			error: err.message,
		});
	}

	reply.send(result);
};
