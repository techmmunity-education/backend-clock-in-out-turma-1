import { employeeMock } from "v1/tests/mocks/employee";
import { login } from "v1/api/employee/login/login.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { sign } from "v1/utils/jwt/sign";
import { RoleTypeEnum } from "v1/enum/role-types";

describe("login service", () => {
	const validCnpj = "12345682412";
	const validName = "João Ninguém";
	const validRole = RoleTypeEnum.EMPLOYEE;
	const validCpf = "85414896347";
	const validPassword = "5564848";

	let employeeDataMockDoc: any;

	beforeAll(async () => {
		employeeDataMockDoc = await employeeMock.doc({
			cpf: validCpf,
			name: validName,
			role: validRole,
			cnpj: validCnpj,
			password: validPassword,
		});
	});

	describe("Successful", () => {
		it("should return an authCode if the params are correct", async () => {
			let result: any;

			employeeMock.repository.findOne.mockResolvedValue(employeeDataMockDoc);

			try {
				result = await login(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						cnpj: validCnpj,
						cpf: validCpf,
						password: validPassword,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				authCode: sign(employeeDataMockDoc),
			});
		});
	});

	describe("Invalid Params", () => {
		it("should throw a CustomError with a generic error message as a result of cnpj validation", async () => {
			let result: any;

			try {
				result = await login(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						cnpj: "testeste.com",
						cpf: validCpf,
						password: validPassword,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Forbidden");
			expect(result.statusCode).toBe(StatusCodeEnum.FORBIDDEN);
		});

		it("should throw a CustomError with a generic error message as a result of password validation", async () => {
			let result: any;

			employeeMock.repository.findOne.mockResolvedValue(employeeDataMockDoc);

			try {
				result = await login(
					{ employeeRepository: employeeMock.repository },
					{
						cnpj: validCnpj,
						cpf: validCpf,
						password: "848978989",
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Forbidden");
			expect(result.statusCode).toBe(StatusCodeEnum.FORBIDDEN);
		});
	});
});
