import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { encrypt } from "v1/utils/encrypt/encrypt";
import { CustomError } from "v1/utils/error";
import { EmployeeRepository } from "../employee.entity";
import { canNotEditManager } from "./helpers/can-not-edit-manager";
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
	{ cnpj, cpf, name, password, role, salary, userRole }: RegisterEmployeeParams,
) => {
	if (await hasEmployeeWithSameCpf({ employeeRepository, cpf })) {
		throw new CustomError(
			"Employee with same CPF already registered",
			StatusCodeEnum.CONFLICT,
		);
	}
	if (canNotEditManager({ role, userRole })) {
		throw new CustomError("Unauthorized", StatusCodeEnum.UNAUTHORIZED);
	}

	const employeeParams = {
		cnpj,
		cpf,
		name,
		password: await encrypt(password),
		role,
		salary,
		isValid: true,
	};

	await employeeRepository.save(employeeParams);
};
