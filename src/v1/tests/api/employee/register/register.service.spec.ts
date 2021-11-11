import { employeeRegister } from "v1/api/employee/register/register.service";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { employeeMock } from "v1/tests/mocks/employee";
import { compare } from "v1/utils/encrypt/compare";
import { CustomError } from "v1/utils/error";

describe("register service", () => {
	const validCnpj = "39.407.242/0001-30";
	const validCpf = "867.020.740-00";
	const validPassword = "fa98s7fa6";
	const validName = "test name";
	const validRole = RoleTypeEnum.EMPLOYEE;
	const validSalary = 4000;
	const validUserRole = RoleTypeEnum.HUMAN_RESOURCES;

	describe("Successful", () => {
		it("should return nothing with a status code 201", async () => {
			let result: any;

			const employee = await employeeMock.doc({
				cnpj: validCnpj,
				cpf: validCpf,
				name: validName,
				password: validPassword,
				role: validRole,
				isValid: true,
			});

			employeeMock.repository.save.mockResolvedValue(employee);

			try {
				result = await employeeRegister(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						cnpj: validCnpj,
						cpf: validCpf,
						name: validName,
						password: validPassword,
						role: RoleTypeEnum.EMPLOYEE,
						salary: validSalary,
						userRole: validUserRole,
					},
				);
			} catch (err: any) {
				result = err;
			}

			const expectedPassword =
				employeeMock.repository.save.mock.calls[0][0].password;

			expect(result).toBeUndefined();
			expect(employeeMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					cnpj: validCnpj,
					cpf: validCpf,
					name: validName,
					role: validRole,
					salary: validSalary,
				}),
			);
			expect(expectedPassword).toStrictEqual(expect.any(String));
			expect(compare(validPassword, expectedPassword)).toBeTruthy();
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a cpf already registered message", async () => {
			let result: any;

			const employee = await employeeMock.doc({
				cnpj: validCnpj,
				cpf: validCpf,
				name: validName,
				password: validPassword,
				role: validRole,
				isValid: true,
			});

			employeeMock.repository.findOne.mockResolvedValue(employee);

			try {
				result = await employeeRegister(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						cnpj: validCnpj,
						cpf: validCpf,
						name: validName,
						password: validPassword,
						role: RoleTypeEnum.EMPLOYEE,
						salary: validSalary,
						userRole: validUserRole,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Employee with same CPF already registered");
			expect(result.statusCode).toBe(StatusCodeEnum.CONFLICT);
		});

		it("should throw a CustomError with a unauthorized message", async () => {
			let result: any;

			try {
				result = await employeeRegister(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						cnpj: validCnpj,
						cpf: validCpf,
						name: validName,
						password: validPassword,
						role: RoleTypeEnum.MANAGER,
						salary: validSalary,
						userRole: validUserRole,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Unauthorized");
			expect(result.statusCode).toBe(StatusCodeEnum.UNAUTHORIZED);
		});
	});
});
