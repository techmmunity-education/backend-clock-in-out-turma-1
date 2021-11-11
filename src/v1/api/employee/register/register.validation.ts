import { RoleTypeEnum, RoleTypeValues } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { RegisterEmployeeParams } from "./register.service";

const schema = yup.object().shape({
	cnpj: yup.string().strict().required(),
	cpf: yup.string().strict().required(),
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	name: yup.string().strict().required().max(1000),
	password: yup.string().strict().required(),
	role: yup.string().strict().required().oneOf(RoleTypeValues()),
	salary: yup.number().strict().required(),
	userRole: yup
		.string()
		.strict()
		.required()
		.oneOf([RoleTypeEnum.MANAGER, RoleTypeEnum.HUMAN_RESOURCES]),
});

export const validation = (params: RegisterEmployeeParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<RegisterEmployeeParams>;
