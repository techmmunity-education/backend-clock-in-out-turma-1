import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { ExampleGetParams } from "./example-get.service";

const schema = yup.object().shape({
	exampleField: yup.string().strict().required(),
});

export const validation = (params: ExampleGetParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<ExampleGetParams>;
