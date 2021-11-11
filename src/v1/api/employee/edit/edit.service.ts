import { RoleTypeEnum } from "v1/enum/role-types";
import { ObjectId } from "mongodb";
import { CustomError } from "v1/utils/error";
import { StatusCodeEnum } from "v1/enum/status-code";
import { cleanObj } from "@techmmunity/utils";
import { encrypt } from "v1/utils/encrypt/encrypt";
import { EmployeeRepository } from "../employee.entity";

export interface Injectables {
	employeeRepository: EmployeeRepository;
}

export interface EditParams {
	id: string;
	name?: string;
	password?: string;
	role?: RoleTypeEnum;
	salary?: number;
	userRole: RoleTypeEnum;
	cnpj: string;
}

export const editEmployee = async (
	{ employeeRepository }: Injectables,
	{ id, name, password, role, salary, userRole, cnpj }: EditParams,
) => {
	const idToFind = new ObjectId(id);

	const employeeData = await employeeRepository.findOne({
		where: { _id: idToFind, cnpj },
	});

	if (!employeeData) {
		throw new CustomError("Employee not found", StatusCodeEnum.NOT_FOUND);
	}

	if (
		employeeData.role === RoleTypeEnum.MANAGER &&
		userRole === RoleTypeEnum.HUMAN_RESOURCES
	) {
		throw new CustomError("Unauthorized", StatusCodeEnum.UNAUTHORIZED);
	}

	const paramsToUpdate = cleanObj({ name, password, role, salary });

	if (paramsToUpdate.password) {
		paramsToUpdate.password = await encrypt(paramsToUpdate.password);
	}

	await employeeRepository.update(employeeData, paramsToUpdate);
};
