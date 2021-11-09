import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { employeeMock } from "v1/tests/mocks/employee";
import { CustomError } from "v1/utils/error";
import { getUserData } from "v1/utils/jwt/get-user-data";
import { sign } from "v1/utils/jwt/sign";

describe("get-user-data util", () => {
	describe("Successfull", () => {
		it("should return a decoded payload", async () => {
			const employee = await employeeMock.doc({
				id: "61899e92c2427e3910fc4e38",
				cnpj: "87987497",
				cpf: "8712839712",
				password: "a8sd7as",
				role: RoleTypeEnum.MANAGER,
				isValid: true,
			});

			const token = sign(employee);

			const result = getUserData(token);

			expect(result).toStrictEqual(
				expect.objectContaining({
					employeeId: "61899e92c2427e3910fc4e38",
					employeeCnpj: "87987497",
					employeeCpf: "8712839712",
					employeeRole: RoleTypeEnum.MANAGER,
				}),
			);
		});
	});

	describe("Failure", () => {
		it("should return a CustomError with a invalid token message", () => {
			let result;
			try {
				result = getUserData([] as any);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Invalid token");
			expect(result.statusCode).toBe(StatusCodeEnum.INTERNAL);
		});
	});
});
