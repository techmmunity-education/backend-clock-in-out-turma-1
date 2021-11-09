import { getRepository } from "typeorm";
import { Route } from "types/route";
import { StatusCodeEnum } from "v1/enum/status-code";
import { getUserData } from "v1/utils/jwt/get-user-data";
import { getToken } from "v1/utils/jwt/get-token";
import { ClockInOutEntity } from "../clock-in-out.entity";
import { validation } from "./create-clock-in-out-validation";
import { createClockInOut } from "./create-clock-in-out.service";

export const createClockInOutController: Route = async (request, reply) => {
	const token = getToken(request);
	const { employeeCnpj, employeeCpf, employeeRole } = getUserData(token);

	const params = {
		...(request.body as any),
		cnpj: employeeCnpj,
		cpf: employeeCpf,
		role: employeeRole,
	};

	try {
		const validatedParams = await validation(params);

		const clockInOutRepository = getRepository(ClockInOutEntity);

		await createClockInOut({ clockInOutRepository }, validatedParams);
	} catch (err: any) {
		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.status(StatusCodeEnum.CREATED).send();
};
