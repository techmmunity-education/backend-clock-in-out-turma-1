export enum RoleTypeEnum {
	MANAGER = "MANAGER",
	HUMAN_RESOURCES = "HUMAN_RESOURCES",
	EMPLOYEE = "EMPLOYEE",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RoleTypeValues = () =>
	[...new Set(Object.values(RoleTypeEnum))] as Array<RoleTypeEnum>;
