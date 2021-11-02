import { getRepository } from "typeorm";
import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { ExampleEntity } from "../example.entity";
import { exampleGet } from "./example-get.service";
import { validation } from "./example-get.validation";

export const exampleGetController: Route = async (request, reply) => {
	let result;

	try {
		const validatedParams = await validation(request.query as any);

		const exampleRepository = getRepository(ExampleEntity);

		result = await exampleGet(
			{
				exampleRepository,
			},
			validatedParams,
		);
	} catch (err: any) {
		// eslint-disable-next-line no-console
		console.error(err);

		return reply.status(err.statusCode || StatusCodeEnum.INTERNAL).send({
			error: err.message,
		});
	}

	reply.send(result);
};
