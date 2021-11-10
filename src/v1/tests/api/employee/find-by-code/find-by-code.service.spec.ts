import { findByCode } from "v1/api/employee/find-by-code/find-by-code.service";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { employeeMock } from "v1/tests/mocks/employee";
import { CustomError } from "v1/utils/error";

describe("findByCode service", () => {
	const validId = "618c3356f5966632a4694bd1";
	const validName = "João Ninguém";

	let employeeMockDoc: any;

	beforeAll(async () => {
		employeeMockDoc = await employeeMock.doc({
			id: validId,
			name: validName,
			password: "DIABO",
			cnpj: "654651136",
			cpf: "789132498",
			role: RoleTypeEnum.EMPLOYEE,
		});
	});

	describe("Successful", () => {
		it("should return a id code", async () => {
			let result: any;

			employeeMock.repository.findOne.mockResolvedValue(employeeMockDoc);

			try {
				result = await findByCode(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						id: validId,
						name: validName,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(employeeMockDoc);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a code not found message", async () => {
			let result: any;

			employeeMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await findByCode(
					{
						employeeRepository: employeeMock.repository,
					},
					{
						id: validId,
						name: validName,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Code not found");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
