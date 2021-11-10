import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { EmployeeRepository } from "../employee.entity";

interface Injectables {
	employeeRepository: EmployeeRepository;
}

export interface FindByCodeParams {
	id: string;
	name: string;
}

export const findByCode = async (
	{ employeeRepository }: Injectables,
	{ id, name }: FindByCodeParams,
) => {
	const code = await employeeRepository.findOne({
		where: { id, name },
	});

	if (!code) {
		throw new CustomError("Code not found", StatusCodeEnum.NOT_FOUND);
	}

	return code;
};
export type FindByCodeType = typeof findByCode;
