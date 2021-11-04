import { sign as signJwt } from "jsonwebtoken";
import { EmployeeEntity } from "v1/api/employee/employee.entity";

export const sign = (employeeData: EmployeeEntity) =>
	signJwt(
		{
			employeeId: employeeData.id.toString(),
		},
		process.env.JWT_PRIVATE_KEY as string,
	);
