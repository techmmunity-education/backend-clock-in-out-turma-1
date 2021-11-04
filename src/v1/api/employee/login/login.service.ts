import { compare } from "bcrypt";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { sign } from "v1/utils/jwt/sign";
import { EmployeeRepository } from "../employee.entity";

interface Injectables {
	employeeRepository: EmployeeRepository;
}

export interface LoginParams {
	cnpj: string;
	cpf: string;
	password: string;
}

export const login = async (
	{ employeeRepository }: Injectables,
	{ cnpj, cpf, password }: LoginParams,
) => {
	const employeeData = await employeeRepository.findOne({
		where: { cnpj, cpf },
	});

	if (!employeeData) {
		throw new CustomError("Forbidden", StatusCodeEnum.FORBIDDEN);
	}

	const isTheSamePassword = await compare(password, employeeData.password);

	if (!isTheSamePassword) {
		throw new CustomError("Forbidden", StatusCodeEnum.FORBIDDEN);
	}

	return {
		authCode: sign(employeeData),
	};
};
