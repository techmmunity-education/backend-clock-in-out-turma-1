import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { ExampleEntity, ExampleRepository } from "../example.entity";

interface Injectables {
	exampleRepository: ExampleRepository;
}

export interface ExampleGetParams {
	exampleField: string;
}

export const exampleGet = async (
	{ exampleRepository }: Injectables,
	{ exampleField }: ExampleGetParams,
) => {
	const example = await exampleRepository.findOne({
		where: {
			exampleField,
		},
	});

	if (!example) {
		throw new CustomError("Example not found", StatusCodeEnum.NOT_FOUND);
	}

	return example;
};
