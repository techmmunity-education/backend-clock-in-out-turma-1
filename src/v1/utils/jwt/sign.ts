import { sign as signJwt } from "jsonwebtoken";
import { EmployeeEntity } from "v1/api/employee/employee.entity";

export const sign = (employeeData: EmployeeEntity) =>
	signJwt(
		{
			employeeId: employeeData.id.toString(),
			employeeRole: employeeData.role,
		},
		process.env.JWT_PRIVATE_KEY as string,
	);
