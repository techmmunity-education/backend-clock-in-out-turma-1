import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { RegisterParams } from "./register.service";

const schema = yup.object().shape({
	cnpj: yup.string().strict().required(),
	cpf: yup.string().strict().required(),
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	name: yup.string().strict().required().min(3).max(1000),
	password: yup.string().strict().required(),
});

export const validation = (params: RegisterParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<RegisterParams>;
