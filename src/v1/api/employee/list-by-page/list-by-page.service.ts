import { isEmptyArray } from "@techmmunity/utils";
import { CustomError } from "v1/utils/error";
import { StatusCodeEnum } from "v1/enum/status-code";
import {
	EMPLOYEES_PER_PAGE,
	paginateEmployees,
} from "./helpers/paginate-employees";
import { EmployeeRepository } from "../employee.entity";

interface Injectables {
	employeeRepository: EmployeeRepository;
}

export interface ListByPageParams {
	page?: number;
	cnpj: string;
}

export const listByPage = async (
	{ employeeRepository }: Injectables,
	{ page, cnpj }: ListByPageParams,
) => {
	const listOfEmployees = await employeeRepository.find({
		where: { cnpj },
		skip: paginateEmployees(page),
		take: EMPLOYEES_PER_PAGE,
	});

	if (isEmptyArray(listOfEmployees)) {
		throw new CustomError(
			"No employee found for this page",
			StatusCodeEnum.NOT_FOUND,
		);
	}

	return listOfEmployees;
};
