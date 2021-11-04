import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { LoginParams } from "./login.service";

const schema = yup.object().shape({
	cnpj: yup.string().strict().required(),
	cpf: yup.string().strict().required(),
	password: yup.string().strict().required(),
});

export const validation = (params: LoginParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<LoginParams>;
