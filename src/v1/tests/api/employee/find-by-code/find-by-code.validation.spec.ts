import { validation } from "v1/api/employee/find-by-code/find-by-code.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("findOne validation", () => {
	const validId = "618c3356f5966632a4694bd1";
	const validName = "João Ninguém";

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({
					id: validId,
					name: validName,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				id: validId,
				name: validName,
			});
		});
	});

	describe("Invalid type", () => {
		it("should return a CustomError with a invalid id type message", async () => {
			let result: any;

			try {
				result = await validation({
					id: 42 as any,
					name: validName,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"id must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid name type message", async () => {
			let result: any;

			try {
				result = await validation({
					id: validId,
					name: 42 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"name must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
