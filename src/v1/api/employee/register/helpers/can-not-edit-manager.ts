import { RoleTypeEnum } from "v1/enum/role-types";

interface CanNotEditManagerParams {
	role: RoleTypeEnum;
	userRole: RoleTypeEnum;
}

export const canNotEditManager = ({
	role,
	userRole,
}: CanNotEditManagerParams) =>
	role === RoleTypeEnum.MANAGER && userRole !== RoleTypeEnum.MANAGER;
