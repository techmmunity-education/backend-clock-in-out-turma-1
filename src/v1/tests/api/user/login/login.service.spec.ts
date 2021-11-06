import { userDataMock } from "v1/tests/mocks/user";
import { login } from "v1/api/user/login/login.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { sign } from "v1/utils/jwt/sign";

describe("login service", () => {
	const validEmail = "teste@teste.com";
	const validPassword = "5564848";

	let userDataMockDoc: any;

	beforeAll(async () => {
		userDataMockDoc = await userDataMock.doc({
			email: validEmail,
			password: validPassword,
		});
	});

	describe("Successful", () => {
		it("should return an authCode if the params are correct", async () => {
			let result: any;

			userDataMock.repository.findOne.mockResolvedValue(userDataMockDoc);

			try {
				result = await login(
					{
						userRepository: userDataMock.repository,
					},
					{
						email: validEmail,
						password: validPassword,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				authCode: sign(userDataMockDoc),
			});
		});
	});

	describe("Invalid Params", () => {
		it("should throw a CustomError with a generic error message as a result of email validation", async () => {
			let result: any;

			try {
				result = await login(
					{
						userRepository: userDataMock.repository,
					},
					{
						email: "testeste.com",
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

			userDataMock.repository.findOne.mockResolvedValue(userDataMockDoc);

			try {
				result = await login(
					{ userRepository: userDataMock.repository },
					{
						email: validEmail,
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
