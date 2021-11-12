import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { FindOneParams } from "./find-by-code.service";

const schema = yup.object().shape({
	id: yup.string().strict().notRequired(),
	name: yup.string().strict().notRequired(),
});

export const validation = (params: FindOneParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<FindOneParams>;
