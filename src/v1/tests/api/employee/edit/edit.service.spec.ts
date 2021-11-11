import { editEmployee } from "v1/api/employee/edit/edit.service";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { employeeMock } from "v1/tests/mocks/employee";
import { compare } from "v1/utils/encrypt/compare";
import { CustomError } from "v1/utils/error";

describe("edit service", () => {
	const validCnpj = "39.407.242/0001-30";
	const validCpf = "867.020.740-00";
	const validPassword = "fa98s7fa6";
	const validName = "test name";

	const changedPassword = "test password";
	const changedName = "new test name";
	const changedRole = RoleTypeEnum.HUMAN_RESOURCES;
	const salary = 4000;

	describe("Successful", () => {
		it("should return nothing with a status code 204", async () => {
			let result: any;

			const employee = await employeeMock.doc({
				id: "618c3566fd2594b90e6c9de9",
				cnpj: validCnpj,
				cpf: validCpf,
				name: validName,
				password: validPassword,
				role: RoleTypeEnum.EMPLOYEE,
				isValid: true,
			});

			employeeMock.repository.findOne.mockResolvedValue(employee);

			employeeMock.repository.update.mockResolvedValue(undefined);

			try {
				result = await editEmployee(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						id: "618c3566fd2594b90e6c9de9",
						name: changedName,
						password: changedPassword,
						role: changedRole,
						salary,
						userRole: RoleTypeEnum.MANAGER,
					},
				);
			} catch (err: any) {
				result = err;
			}

			const expectedPassword =
				employeeMock.repository.update.mock.calls[0][1].password;

			expect(result).toBeUndefined();
			expect(employeeMock.repository.update).toHaveBeenCalledWith(
				employee,
				expect.objectContaining({
					name: changedName,
					role: changedRole,
					salary,
				}),
			);
			expect(expectedPassword).toStrictEqual(expect.any(String));
			expect(compare(changedPassword, expectedPassword)).toBeTruthy();
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a employee not found message", async () => {
			let result: any;

			employeeMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await editEmployee(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						id: "618c3566fd2594b90e6c9de9",
						name: changedName,
						password: changedPassword,
						role: changedRole,
						salary,
						userRole: RoleTypeEnum.MANAGER,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Employee not found");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});

		it("should throw a CustomError with a unauthorized message", async () => {
			let result: any;

			const employee = await employeeMock.doc({
				id: "618c3566fd2594b90e6c9de9",
				cnpj: validCnpj,
				cpf: validCpf,
				name: validName,
				password: validPassword,
				role: RoleTypeEnum.MANAGER,
				isValid: true,
			});

			employeeMock.repository.findOne.mockResolvedValue(employee);

			try {
				result = await editEmployee(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						id: "618c3566fd2594b90e6c9de9",
						name: changedName,
						password: changedPassword,
						role: changedRole,
						salary,
						userRole: RoleTypeEnum.HUMAN_RESOURCES,
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
