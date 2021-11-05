import { ExampleGetParams } from "v1/api/example/example-get/example-get.service";
import { validation } from "v1/api/example/example-get/example-get.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("exampleGet validation", () => {
	const validExampleField = "aa0d8a";

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({
					exampleField: validExampleField,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				exampleField: validExampleField,
			});
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with a undefined exampleField param message", async () => {
			let result: any;

			try {
				result = await validation({} as ExampleGetParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("exampleField is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should return a CustomError with a invalid exampleField type message", async () => {
			let result: any;

			try {
				result = await validation({
					exampleField: 42 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"exampleField must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
