import { LoginParams } from "v1/api/employee/login/login.service";
import { validation } from "v1/api/employee/login/login.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("Login validation", () => {
	const validCnpj = "123.456.824-12";
	const validCpf = "854.148.963-47";
	const validPassword = "5648G94SAG8965";

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				cnpj: validCnpj,
				cpf: validCpf,
				password: validPassword,
			});
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with a undefined cnpj param message", async () => {
			let result: any;

			try {
				result = await validation({
					cpf: validCpf,
					password: validPassword,
				} as LoginParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("cnpj is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined cpf param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					password: validPassword,
				} as LoginParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("cpf is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined password param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
				} as LoginParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("password is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should return a CustomError with a invalid cnpj type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: 42 as any,
					cpf: validCpf,
					password: validPassword,
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

		it("should return a CustomError with a invalid cpf type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: 54854 as any,
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"cpf must be a `string` type, but the final value was: `54854`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid password type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					password: 1565456 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"password must be a `string` type, but the final value was: `1565456`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
