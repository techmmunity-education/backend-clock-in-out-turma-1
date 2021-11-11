import { listByPage } from "v1/api/employee/list-by-page/list-by-page.service";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { employeeMock } from "v1/tests/mocks/employee";
import { CustomError } from "v1/utils/error";

describe("listByPage service", () => {
	const validCnpj = "39.407.242/0001-30";
	const validCpf = "867.020.740-00";
	const validPassword = "fa98s7fa6";
	const validPage = 1;
	const validName = "test name";

	let employee: any;

	beforeAll(() => {
		employee = employeeMock.doc({
			cnpj: validCnpj,
			cpf: validCpf,
			password: validPassword,
			role: RoleTypeEnum.EMPLOYEE,
			isValid: true,
			name: validName,
		});
	});

	describe("Successful", () => {
		it("should return an array of employees", async () => {
			let result: any;

			employeeMock.repository.find.mockResolvedValue([employee]);

			try {
				result = await listByPage(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						page: validPage,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([employee]);
		});

		it("should return the array of employees from the first page", async () => {
			let result: any;

			employeeMock.repository.find.mockResolvedValue([employee]);

			try {
				result = await listByPage(
					{
						employeeRepository: employeeMock.repository,
					},
					{},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([employee]);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a No employee found for this page message", async () => {
			let result: any;

			employeeMock.repository.find.mockResolvedValue([]);

			try {
				result = await listByPage(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						page: 2,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("No employee found for this page");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
