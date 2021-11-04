import { getRepository } from "typeorm";
import { Route } from "types/route";
import { EmployeeEntity } from "v1/api/employee/employee.entity";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CompanyEntity } from "../company.entity";
import { register } from "./register.service";
import { validation } from "./register.validation";

export const registerController: Route = async (request, reply) => {
	let result;

	try {
		const validatedParams = await validation(request.body as any);

		const companyRepository = getRepository(CompanyEntity);
		const employeeRepository = getRepository(EmployeeEntity);

		result = await register(
			{
				companyRepository,
				employeeRepository,
			},
			validatedParams,
		);
	} catch (err: any) {
		return reply.status(err.statusCode || StatusCodeEnum.INTERNAL).send({
			error: err.message,
		});
	}

	reply.send(result);
};
