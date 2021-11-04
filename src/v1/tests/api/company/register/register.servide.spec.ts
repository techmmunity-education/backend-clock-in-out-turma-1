import { register } from "v1/api/company/register/register.service";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { companyMock } from "v1/tests/mocks/company";
import { employeeMock } from "v1/tests/mocks/employee";
import { CustomError } from "v1/utils/error";
import { sign } from "v1/utils/jwt/sign";

describe("register service", () => {
	const validCnpj = "39.407.242/0001-30";
	const validCpf = "867.020.740-00";
	const validName = "KekTestCompany";
	const validCreatedAt = new Date();
	const validPassword = "fa98s7fa6";

	describe("Successful", () => {
		it("should return a authCode", async () => {
			let result: any;

			const company = await companyMock.doc({
				cnpj: validCnpj,
				name: validName,
				createdAt: validCreatedAt,
			});

			const employee = await employeeMock.doc({
				cnpj: validCnpj,
				cpf: validCpf,
				password: validPassword,
				role: RoleTypeEnum.MANAGER,
				isValid: true,
			});

			companyMock.repository.save.mockResolvedValue(company);

			employeeMock.repository.save.mockResolvedValue(employee);

			try {
				result = await register(
					{
						companyRepository: companyMock.repository,
						employeeRepository: employeeMock.repository,
					},
					{
						cnpj: validCnpj,
						name: validName,
						cpf: validCpf,
						password: validPassword,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				authCode: sign(employee),
			});
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a conflict error message as a result of duplicated CNPJ", async () => {
			let result: any;

			const company = await companyMock.doc({
				cnpj: validCnpj,
				name: validName,
				createdAt: validCreatedAt,
			});

			companyMock.repository.findOne.mockResolvedValue(company);

			try {
				result = await register(
					{
						companyRepository: companyMock.repository,
						employeeRepository: employeeMock.repository,
					},
					{
						cnpj: validCnpj,
						name: validName,
						cpf: validCpf,
						password: validPassword,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Company with same CNPJ already registered");
			expect(result.statusCode).toBe(StatusCodeEnum.CONFLICT);
		});
	});
});
