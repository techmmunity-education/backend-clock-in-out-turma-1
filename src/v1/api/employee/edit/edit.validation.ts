import * as yup from "yup";
import { RoleTypeEnum, RoleTypeValues } from "v1/enum/role-types";
import { CustomError } from "v1/utils/error";
import { StatusCodeEnum } from "v1/enum/status-code";
import { EditParams } from "./edit.service";

const schema = yup.object().shape({
	id: yup.string().strict().required(),
	name: yup.string().strict().notRequired(),
	password: yup.string().strict().notRequired(),
	role: yup.string().strict().notRequired().oneOf(RoleTypeValues()),
	salary: yup.number().strict().notRequired(),
	userRole: yup
		.string()
		.strict()
		.required()
		.oneOf([RoleTypeEnum.MANAGER, RoleTypeEnum.HUMAN_RESOURCES]),
	cnpj: yup.string().strict().required(),
});

export const validation = (params: EditParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<EditParams>;
