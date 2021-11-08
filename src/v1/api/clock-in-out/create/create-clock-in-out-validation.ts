import { ClockInOutTypeValues } from "v1/enum/clock-in-out-type";
import { RoleTypeValues } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { ClockInOutParams } from "./create-clock-in-out.service";

const schema = yup.object().shape({
	cnpj: yup.string().strict().required(),
	cpf: yup.string().strict().required(),
	createdAt: yup.date().notRequired(),
	type: yup.string().strict().required().oneOf(ClockInOutTypeValues()),
	isJustified: yup.boolean().strict().notRequired(),
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	reason: yup.string().strict().notRequired().max(5000),
	role: yup.string().strict().required().oneOf(RoleTypeValues()),
});

export const validation = (params: ClockInOutParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<ClockInOutParams>;
