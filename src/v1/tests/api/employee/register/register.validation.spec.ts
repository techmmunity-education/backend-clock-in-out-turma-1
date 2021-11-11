import { RegisterEmployeeParams } from "v1/api/employee/register/register.service";
import { validation } from "v1/api/employee/register/register.validation";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("register validation", () => {
	const validCnpj = "39.407.242/0001-30";
	const validCpf = "867.020.740-00";
	const validPassword = "fa98s7fa6";
	const validName = "test name";
	const validRole = RoleTypeEnum.EMPLOYEE;
	const validSalary = 4000;
	const validUserRole = RoleTypeEnum.HUMAN_RESOURCES;

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: validName,
					password: validPassword,
					role: validRole,
					salary: validSalary,
					userRole: validUserRole,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				cnpj: validCnpj,
				cpf: validCpf,
				name: validName,
				password: validPassword,
				role: validRole,
				salary: validSalary,
				userRole: validUserRole,
			});
		});
	});

	describe("Invalid params", () => {
		it("should return a CustomError with a invalid name param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: "a".repeat(1001),
					password: validPassword,
					role: validRole,
					salary: validSalary,
					userRole: validUserRole,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("name must be at most 1000 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid userRole param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: validName,
					password: validPassword,
					role: validRole,
					salary: validSalary,
					userRole: RoleTypeEnum.EMPLOYEE,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"userRole must be one of the following values: MANAGER, HUMAN_RESOURCES",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with a undefined cnpj param message", async () => {
			let result: any;

			try {
				result = await validation({
					cpf: validCpf,
					name: validName,
					password: validPassword,
					role: validRole,
					salary: validSalary,
					userRole: validUserRole,
				} as RegisterEmployeeParams);
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
					name: validName,
					password: validPassword,
					role: validRole,
					salary: validSalary,
					userRole: validUserRole,
				} as RegisterEmployeeParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("cpf is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined name param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					password: validPassword,
					role: validRole,
					salary: validSalary,
					userRole: validUserRole,
				} as RegisterEmployeeParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("name is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined password param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: validName,
					role: validRole,
					salary: validSalary,
					userRole: validUserRole,
				} as RegisterEmployeeParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("password is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined role param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: validName,
					password: validPassword,
					salary: validSalary,
					userRole: validUserRole,
				} as RegisterEmployeeParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("role is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined salary param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: validName,
					password: validPassword,
					role: validRole,
					userRole: validUserRole,
				} as RegisterEmployeeParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("salary is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined userRole param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: validName,
					password: validPassword,
					role: validRole,
					salary: validSalary,
				} as RegisterEmployeeParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("userRole is a required field");
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
					name: validName,
					password: validPassword,
					role: validRole,
					salary: validSalary,
					userRole: validUserRole,
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
					name: validName,
					password: validPassword,
					role: validRole,
					salary: validSalary,
					userRole: validUserRole,
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

		it("should return a CustomError with a invalid name type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: 42 as any,
					password: validPassword,
					role: validRole,
					salary: validSalary,
					userRole: validUserRole,
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

		it("should return a CustomError with a invalid password type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: validName,
					password: 42 as any,
					role: validRole,
					salary: validSalary,
					userRole: validUserRole,
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

		it("should return a CustomError with a invalid role type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: validName,
					password: validPassword,
					role: 42 as any,
					salary: validSalary,
					userRole: validUserRole,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"role must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid salary type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: validName,
					password: validPassword,
					role: validRole,
					salary: "test" as any,
					userRole: validUserRole,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				'salary must be a `number` type, but the final value was: `"test"`.',
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid userRole type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					name: validName,
					password: validPassword,
					role: validRole,
					salary: validSalary,
					userRole: 42 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"userRole must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
