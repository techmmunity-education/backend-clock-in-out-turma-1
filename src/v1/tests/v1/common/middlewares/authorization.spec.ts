import {
	authorizationMiddleware,
	setAuthorizationMiddleware,
} from "v1/common/middlewares/authorization";
import { StatusCodeEnum } from "v1/enum/status-code";
import { sign } from "v1/utils/jwt/sign";
import { RoleTypeEnum } from "v1/enum/role-types";
import { employeeMock } from "v1/tests/mocks/employee";

describe("Authorization middleware", () => {
	const done = jest.fn();

	describe("setAuthorization middleware", () => {
		it("should define onRequest hook", () => {
			let result: any;

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
			let result: any;
			const employee = await employeeMock.doc({
				cnpj: "39.407.242/0001-30",
				cpf: "867.020.740-00",
				password: "fa98s7fa6",
				role: RoleTypeEnum.MANAGER,
			});
			const token = sign(employee);
			const reply = {
				status: jest.fn().mockReturnValue({ send: jest.fn() }),
			};
			const request = {
				headers: { authorization: `Bearer ${token}` },
			};

			try {
				const trueAuthorizationMiddleware = authorizationMiddleware([
					RoleTypeEnum.MANAGER,
				]);
				const authorizationMiddlewareWithContext =
					trueAuthorizationMiddleware.bind({} as any);

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
		it("should return a error with a authorization missing message", () => {
			let result: any;
			const send = jest.fn();

			const reply = {
				status: jest.fn().mockReturnValue({ send }),
			};
			const request = {
				headers: {},
			};

			try {
				const trueAuthorizationMiddleware = authorizationMiddleware([
					RoleTypeEnum.MANAGER,
				]);
				const authorizationMiddlewareWithContext =
					trueAuthorizationMiddleware.bind({} as any);

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
			let result: any;
			const send = jest.fn();

			const reply = {
				status: jest.fn().mockReturnValue({ send }),
			};
			const request = {
				headers: { authorization: "testinvalidtokenpattern" },
			};

			try {
				const trueAuthorizationMiddleware = authorizationMiddleware([
					RoleTypeEnum.MANAGER,
				]);
				const authorizationMiddlewareWithContext =
					trueAuthorizationMiddleware.bind({} as any);

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
			let result: any;
			const send = jest.fn();

			const reply = {
				status: jest.fn().mockReturnValue({ send }),
			};
			const request = {
				headers: { authorization: "Bearer testinvalidtoken" },
			};

			try {
				const trueAuthorizationMiddleware = authorizationMiddleware([
					RoleTypeEnum.MANAGER,
				]);
				const authorizationMiddlewareWithContext =
					trueAuthorizationMiddleware.bind({} as any);

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
			let result: any;
			const employee = await employeeMock.doc({
				cnpj: "39.407.242/0001-30",
				cpf: "867.020.740-00",
				password: "fa98s7fa6",
				role: RoleTypeEnum.EMPLOYEE,
			});
			const token = sign(employee);

			const send = jest.fn();

			const reply = {
				status: jest.fn().mockReturnValue({ send }),
			};
			const request = {
				headers: { authorization: `Bearer ${token}` },
			};

			try {
				const trueAuthorizationMiddleware = authorizationMiddleware([
					RoleTypeEnum.MANAGER,
				]);
				const authorizationMiddlewareWithContext =
					trueAuthorizationMiddleware.bind({} as any);

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
