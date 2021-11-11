import { ListByPageParams } from "v1/api/employee/list-by-page/list-by-page.service";
import { validation } from "v1/api/employee/list-by-page/list-by-page.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("listByPage validation", () => {
	const validCnpj = "39.407.242/0001-30";
	const validPage = 1;

	describe("Successful", () => {
		it("should return validated params (with page number)", async () => {
			let result: any;

			try {
				result = await validation({
					page: validPage,
					cnpj: validCnpj,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				page: validPage,
				cnpj: validCnpj,
			});
		});

		it("should return validated params (without page)", async () => {
			let result: any;

			try {
				result = await validation({ cnpj: validCnpj });
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({ cnpj: validCnpj });
		});

		it("should return validated params (with page string)", async () => {
			let result: any;

			try {
				result = await validation({
					page: String(validPage) as any,
					cnpj: validCnpj,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				page: validPage,
				cnpj: validCnpj,
			});
		});
	});

	describe("Invalid param", () => {
		it("should return a CustomError with a invalid param message", async () => {
			let result: any;

			try {
				result = await validation({
					page: -2,
					cnpj: validCnpj,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("page must be greater than or equal to 1");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Undefined param", () => {
		it("should return a CustomError with a undefined cnpj param message", async () => {
			let result: any;

			try {
				result = await validation({
					page: 1,
				} as ListByPageParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("cnpj is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should return a CustomError with a invalid page type message", async () => {
			let result: any;

			try {
				result = await validation({
					page: {} as any,
					cnpj: validCnpj,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"page must be a `number` type, but the final value was: `NaN` (cast from the value `{}`).",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid cnpj type message", async () => {
			let result: any;

			try {
				result = await validation({
					page: 1,
					cnpj: 42 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"cnpj must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
