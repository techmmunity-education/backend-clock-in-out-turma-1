import { RegisterParams } from "v1/api/company/register/register.service";
import { validation } from "v1/api/company/register/register.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("register validation", () => {
	const validCnpj = "39.407.242/0001-30";
	const validCpf = "867.020.740-00";
	const validCompanyName = "KekTestCompany";
	const validEmployeeName = "KekTestEmployee";
	const validPassword = "fa98s7fa6";

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					companyName: validCompanyName,
					employeeName: validEmployeeName,
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				cnpj: validCnpj,
				cpf: validCpf,
				companyName: validCompanyName,
				employeeName: validEmployeeName,
				password: validPassword,
			});
		});
	});

	describe("Invalid params", () => {
		it("should throw a CustomError with a invalid, too short, company name param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					companyName: "a",
					employeeName: validEmployeeName,
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("companyName must be at least 3 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid, too short, employee name param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					companyName: validCompanyName,
					employeeName: "a",
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("employeeName must be at least 3 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid, too long, name param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					companyName: "a".repeat(1001),
					employeeName: validEmployeeName,
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("companyName must be at most 250 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	it("should throw a CustomError with a invalid, too long, name param message", async () => {
		let result: any;

		try {
			result = await validation({
				cnpj: validCnpj,
				cpf: validCpf,
				companyName: validCompanyName,
				employeeName: "a".repeat(1001),
				password: validPassword,
			});
		} catch (err: any) {
			result = err;
		}

		expect(result instanceof CustomError).toBeTruthy();
		expect(result.message).toBe("employeeName must be at most 100 characters");
		expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with a undefined companyName param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					employeeName: validEmployeeName,
					cpf: validCpf,
					password: validPassword,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("companyName is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined employeeName param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					companyName: validCompanyName,
					cpf: validCpf,
					password: validPassword,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("employeeName is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined cnpj param message", async () => {
			let result: any;

			try {
				result = await validation({
					cpf: validCpf,
					companyName: validCompanyName,
					employeeName: validEmployeeName,
					password: validPassword,
				} as RegisterParams);
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
					companyName: validCompanyName,
					employeeName: validEmployeeName,
					password: validPassword,
				} as RegisterParams);
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
					companyName: validCompanyName,
					employeeName: validEmployeeName,
				} as RegisterParams);
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
					companyName: validCompanyName,
					employeeName: validEmployeeName,
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
					cpf: 42 as any,
					companyName: validCompanyName,
					employeeName: validEmployeeName,
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"cpf must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid companyName type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					companyName: 42 as any,
					employeeName: validEmployeeName,
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"companyName must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid employeeName type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					employeeName: 42 as any,
					companyName: validCompanyName,
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"employeeName must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid password type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					companyName: validCompanyName,
					employeeName: validEmployeeName,
					password: 42 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"password must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
