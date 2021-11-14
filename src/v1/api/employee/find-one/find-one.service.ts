import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { EmployeeRepository } from "../employee.entity";

interface Injectables {
	employeeRepository: EmployeeRepository;
}

export interface FindOneParams {
	id?: string;
	name?: string;
}

export const findOne = async (
	{ employeeRepository }: Injectables,
	{ id, name }: FindOneParams,
) => {
	if (!id && !name) {
		throw new CustomError(
			"id or name are required",
			StatusCodeEnum.BAD_REQUEST,
		);
	}

	const conditions = [];

	if (id) {
		conditions.push({ _id: id });
	}

	if (name) {
		conditions.push({ name });
	}

	const employeeData = await employeeRepository.findOne({
		where: { $or: conditions },
	});

	if (!employeeData) {
		throw new CustomError("Employee not found", StatusCodeEnum.NOT_FOUND);
	}

	return employeeData;
};

export type FindOneType = typeof findOne;
