import {
	authorizationMiddleware,
	setAuthorizationMiddleware,
} from "v1/common/middlewares/authorization";
import { StatusCodeEnum } from "v1/enum/status-code";
import { sign } from "v1/utils/jwt/sign";
import { RoleTypeEnum } from "v1/enum/role-types";
import { employeeMock } from "v1/tests/mocks/employee";

describe("Authorization middleware", () => {
	let result: any;
	const done = jest.fn();

	const trueAuthorizationMiddleware = authorizationMiddleware([
		RoleTypeEnum.MANAGER,
	]);
	const authorizationMiddlewareWithContext = trueAuthorizationMiddleware.bind(
		{} as any,
	);

	describe("setAuthorization middleware", () => {
		it("should define onRequest hook", () => {
			const fastify = {
				addHook: jest.fn(),
			};

			try {
				const trueSetAuthorizationMiddleware = setAuthorizationMiddleware([
					RoleTypeEnum.MANAGER,
				]);
				result = trueSetAuthorizationMiddleware(fastify as any, {}, done);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(fastify.addHook).toHaveBeenCalledTimes(1);
			expect(done).toHaveBeenCalled();
		});
	});

	describe("Successful", () => {
		it("shouldn't return any error", async () => {
			const employee = await employeeMock.doc({
				cnpj: "39.407.242/0001-30",
				cpf: "867.020.740-00",
				password: "fa98s7fa6",
				role: RoleTypeEnum.MANAGER,
				name: "test name",
			});
			const token = sign(employee);
			const reply = {
				status: jest.fn().mockReturnValue({ send: jest.fn() }),
			};
			const request = {
				headers: { authorization: `Bearer ${token}` },
			};

			try {
				result = authorizationMiddlewareWithContext(
					request as any,
					reply as any,
					done,
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(done).toHaveBeenCalled();
			expect(done).toHaveBeenCalledWith();
		});
	});

	describe("Failure", () => {
		const send = jest.fn();
		const reply = {
			status: jest.fn().mockReturnValue({ send }),
		};

		beforeEach(() => {
			reply.status.mockReturnValue({ send });
		});

		it("should return a error with a authorization missing message", () => {
			const request = {
				headers: {},
			};

			try {
				result = authorizationMiddlewareWithContext(
					request as any,
					reply as any,
					done,
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(reply.status).toHaveBeenCalledTimes(1);
			expect(reply.status).toHaveBeenCalledWith(StatusCodeEnum.FORBIDDEN);
			expect(send).toBeCalledTimes(1);
			expect(send).toBeCalledWith({
				error: "authorization is a required header",
			});
		});

		it("should return a error with a invalid token pattern message", () => {
			const request = {
				headers: { authorization: "testinvalidtokenpattern" },
			};

			try {
				result = authorizationMiddlewareWithContext(
					request as any,
					reply as any,
					done,
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(reply.status).toHaveBeenCalledTimes(1);
			expect(reply.status).toHaveBeenCalledWith(StatusCodeEnum.FORBIDDEN);
			expect(send).toBeCalledTimes(1);
			expect(send).toBeCalledWith({
				error: "Invalid token pattern",
			});
		});

		it("should return a error with a invalid token message", () => {
			const request = {
				headers: { authorization: "Bearer testinvalidtoken" },
			};

			try {
				result = authorizationMiddlewareWithContext(
					request as any,
					reply as any,
					done,
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(reply.status).toHaveBeenCalledTimes(1);
			expect(reply.status).toHaveBeenCalledWith(StatusCodeEnum.FORBIDDEN);
			expect(send).toBeCalledTimes(1);
			expect(send).toBeCalledWith({
				error: "Invalid token",
			});
		});

		it("should return a error with a access denied message", async () => {
			const employee = await employeeMock.doc({
				cnpj: "39.407.242/0001-30",
				cpf: "867.020.740-00",
				password: "fa98s7fa6",
				role: RoleTypeEnum.EMPLOYEE,
				name: "test name",
			});
			const token = sign(employee);

			const request = {
				headers: { authorization: `Bearer ${token}` },
			};

			try {
				result = authorizationMiddlewareWithContext(
					request as any,
					reply as any,
					done,
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(reply.status).toHaveBeenCalledTimes(1);
			expect(reply.status).toHaveBeenCalledWith(StatusCodeEnum.UNAUTHORIZED);
			expect(send).toBeCalledTimes(1);
			expect(send).toBeCalledWith({
				error: "Access denied",
			});
		});
	});
});
