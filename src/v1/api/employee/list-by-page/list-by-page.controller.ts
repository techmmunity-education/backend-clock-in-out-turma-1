import { getRepository } from "typeorm";
import { Route } from "types/route";
import { StatusCodeEnum } from "v1/enum/status-code";
import { getToken } from "v1/utils/jwt/get-token";
import { getUserData } from "v1/utils/jwt/get-user-data";
import { EmployeeEntity } from "../employee.entity";
import { listByPage } from "./list-by-page.service";
import { validation } from "./list-by-page.validation";

export const listByPageController: Route = async (request, reply) => {
	let result;

	const token = getToken(request);
	const { employeeCnpj } = getUserData(token);

	const params = {
		...(request.query as any),
		cnpj: employeeCnpj,
	};

	try {
		const validatedParams = await validation(params);

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
