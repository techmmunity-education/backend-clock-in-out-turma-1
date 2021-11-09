import { isEmptyArray } from "@techmmunity/utils";
import { CustomError } from "v1/utils/error";
import { StatusCodeEnum } from "v1/enum/status-code";
import { paginateEmployees } from "./helpers/paginate-employees";
import { EmployeeRepository } from "../employee.entity";

interface Injectables {
	employeeRepository: EmployeeRepository;
}

export interface ListByPageParams {
	page?: number;
}

export const listByPage = async (
	{ employeeRepository }: Injectables,
	{ page }: ListByPageParams,
) => {
	const listOfEmployees = await employeeRepository.find({
		skip: paginateEmployees(page),
		take: 15,
	});

	if (isEmptyArray(listOfEmployees)) {
		throw new CustomError(
			"No employee found for this page",
			StatusCodeEnum.NOT_FOUND,
		);
	}

	return listOfEmployees;
};
