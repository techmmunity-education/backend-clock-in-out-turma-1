import { sign as signJwt } from "jsonwebtoken";
import { EmployeeEntity } from "v1/api/employee/employee.entity";
import { Payload } from "./types";

export const sign = (employeeData: EmployeeEntity) => {
	const employeePayload: Payload = {
		employeeId: employeeData.id.toString(),
		employeeCnpj: employeeData.cnpj,
		employeeCpf: employeeData.cpf,
		employeeRole: employeeData.role,
	};

	return signJwt(employeePayload, process.env.JWT_PRIVATE_KEY as string);
};
