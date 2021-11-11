import { EmployeeRepository } from "v1/api/employee/employee.entity";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { encrypt } from "v1/utils/encrypt/encrypt";
import { CustomError } from "v1/utils/error";
import { sign } from "v1/utils/jwt/sign";
import { CompanyRepository } from "../company.entity";
import { hasCompanyWithSameCnpj } from "../helpers/has-company-with-same-cnpj";

interface Injectables {
	companyRepository: CompanyRepository;
	employeeRepository: EmployeeRepository;
}

export interface RegisterParams {
	cnpj: string;
	name: string;
	cpf: string;
	password: string;
}

export const register = async (
	{ companyRepository, employeeRepository }: Injectables,
	params: RegisterParams,
) => {
	if (
		await hasCompanyWithSameCnpj({
			companyRepository,
			cnpj: params.cnpj,
		})
	) {
		throw new CustomError(
			"Company with same CNPJ already registered",
			StatusCodeEnum.CONFLICT,
		);
	}

	const companyParams = {
		cnpj: params.cnpj,
		name: params.name,
	};

	await companyRepository.save(companyParams);

	const employeeParams = {
		cnpj: params.cnpj,
		cpf: params.cpf,
		password: await encrypt(params.password),
		role: RoleTypeEnum.MANAGER,
		isValid: true,
	};

	const employeeData = await employeeRepository.save(employeeParams);

	return {
		authCode: sign(employeeData),
	};
};
