import { getRepository } from "typeorm";
import { Route } from "types/route";
import { StatusCodeEnum } from "v1/enum/status-code";
import { EmployeeEntity } from "../employee.entity";
import { findOne } from "./find-by-code.service";
import { validation } from "./find-by-code.validation";

export const findOneController: Route = async (request, reply) => {
	let result;

	try {
		const validatedParams = await validation(request.query as any);

		const employeeRepository = getRepository(EmployeeEntity);

		result = await findOne(
			{
				employeeRepository,
			},
			validatedParams,
		);
	} catch (err: any) {
		console.error(err);

		return reply.status(err.statusCode || StatusCodeEnum.INTERNAL).send({
			error: err.message,
		});
	}

	return reply.send(result);
};
