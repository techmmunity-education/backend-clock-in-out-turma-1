import { getRepository } from "typeorm";
import { Route } from "types/route";
import { StatusCodeEnum } from "v1/enum/status-code";
import { getToken } from "v1/utils/jwt/get-token";
import { getUserData } from "v1/utils/jwt/get-user-data";
import { EmployeeEntity } from "../employee.entity";
import { employeeRegister } from "./register.service";
import { validation } from "./register.validation";

export const employeeRegisterController: Route = async (request, reply) => {
	const token = getToken(request);
	const { employeeCnpj, employeeRole } = getUserData(token);

	const params = {
		...(request.body as any),
		cnpj: employeeCnpj,
		userRole: employeeRole,
	};

	try {
		const validatedParams = await validation(params);

		const employeeRepository = getRepository(EmployeeEntity);

		await employeeRegister({ employeeRepository }, validatedParams);
	} catch (err: any) {
		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.status(StatusCodeEnum.CREATED).send();
};
