import { RoleTypeEnum } from "v1/enum/role-types";
import { employeeMock } from "v1/tests/mocks/employee";
import { sign } from "v1/utils/jwt/sign";
import { tokenManipulation } from "v1/utils/jwt/token-manipulation";

describe("token-manipulation util", () => {
	it("should return a formatted token", async () => {
		const employee = await employeeMock.doc({
			id: "61899e92c2427e3910fc4e38",
			cnpj: "87987497",
			cpf: "8712839712",
			password: "a8sd7as",
			role: RoleTypeEnum.MANAGER,
			isValid: true,
		});

		const token = sign(employee);
		const request = {
			headers: {
				authorization: `Bearer ${token}`,
			},
		};

		const result = tokenManipulation(request as any);

		expect(result).toStrictEqual(token);
	});
});
