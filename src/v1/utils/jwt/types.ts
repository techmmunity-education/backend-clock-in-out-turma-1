import { RoleTypeEnum } from "v1/enum/role-types";

export interface Payload {
	employeeId: string;
	employeeCnpj: string;
	employeeCpf: string;
	employeeRole: RoleTypeEnum;
}
