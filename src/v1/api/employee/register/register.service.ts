import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { encrypt } from "v1/utils/encrypt/encrypt";
import { CustomError } from "v1/utils/error";
import { EmployeeRepository } from "../employee.entity";
import { hasEmployeeWithSameCpf } from "./helpers/has-employee-with-same-cpf";

export interface Injectables {
	employeeRepository: EmployeeRepository;
}

export interface RegisterEmployeeParams {
	cnpj: string;
	cpf: string;
	name: string;
	password: string;
	role: RoleTypeEnum;
	salary: number;
	userRole: RoleTypeEnum;
}

export const employeeRegister = async (
	{ employeeRepository }: Injectables,
	params: RegisterEmployeeParams,
) => {
	if (await hasEmployeeWithSameCpf({ employeeRepository, cpf: params.cpf })) {
		throw new CustomError(
			"Employee with same CPF already registered",
			StatusCodeEnum.CONFLICT,
		);
	}

	if (
		params.role === RoleTypeEnum.MANAGER &&
		params.userRole !== RoleTypeEnum.MANAGER
	) {
		throw new CustomError("Unauthorized", StatusCodeEnum.UNAUTHORIZED);
	}

	const employeeParams = {
		cnpj: params.cnpj,
		cpf: params.cpf,
		name: params.name,
		password: await encrypt(params.password),
		role: params.role,
		salary: params.salary,
		isValid: true,
	};

	await employeeRepository.save(employeeParams);
};
