import { getRepository } from "typeorm";
import { Route } from "types/route";
import { StatusCodeEnum } from "v1/enum/status-code";
import { EmployeeEntity } from "../employee.entity";
import { listByPage } from "./list-by-page.service";
import { validation } from "./list-by-page.validation";

export const listByPageController: Route = async (request, reply) => {
	let result;

	try {
		const validatedParams = await validation(request.query as any);

		const employeeRepository = getRepository(EmployeeEntity);

		result = await listByPage(
			{
				employeeRepository,
			},
			validatedParams,
		);
	} catch (err: any) {
		console.error(err);

		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.send(result);
};
