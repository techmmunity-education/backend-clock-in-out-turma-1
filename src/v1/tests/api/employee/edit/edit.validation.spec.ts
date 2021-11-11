import { EditParams } from "v1/api/employee/edit/edit.service";
import { validation } from "v1/api/employee/edit/edit.validation";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("edit validation", () => {
	const changedPassword = "test password";
	const changedName = "new test name";
	const changedRole = RoleTypeEnum.HUMAN_RESOURCES;
	const salary = 4000;

	describe("Successful", () => {
		it("should return validated params with all params been supplied", async () => {
			let result: any;

			try {
				result = await validation({
					id: "618c3566fd2594b90e6c9de9",
					name: changedName,
					password: changedPassword,
					role: changedRole,
					salary,
					userRole: RoleTypeEnum.MANAGER,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				id: "618c3566fd2594b90e6c9de9",
				name: changedName,
				password: changedPassword,
				role: changedRole,
				salary,
				userRole: RoleTypeEnum.MANAGER,
			});
		});

		it("should return validated params with only the required params been supplied", async () => {
			let result: any;

			try {
				result = await validation({
					id: "618c3566fd2594b90e6c9de9",
					userRole: RoleTypeEnum.MANAGER,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				id: "618c3566fd2594b90e6c9de9",
				userRole: RoleTypeEnum.MANAGER,
			});
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with a undefined id param message", async () => {
			let result: any;

			try {
				result = await validation({
					name: changedName,
					password: changedPassword,
					role: changedRole,
					salary,
					userRole: RoleTypeEnum.MANAGER,
				} as EditParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("id is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined userRole param message", async () => {
			let result: any;

			try {
				result = await validation({
					id: "618c3566fd2594b90e6c9de9",
					name: changedName,
					password: changedPassword,
					role: changedRole,
					salary,
				} as EditParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("userRole is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should return a CustomError with a invalid id type message", async () => {
			let result: any;

			try {
				result = await validation({
					id: 42 as any,
					name: changedName,
					password: changedPassword,
					role: changedRole,
					salary,
					userRole: RoleTypeEnum.MANAGER,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"id must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid name type message", async () => {
			let result: any;

			try {
				result = await validation({
					id: "618c3566fd2594b90e6c9de9",
					name: 42 as any,
					password: changedPassword,
					role: changedRole,
					salary,
					userRole: RoleTypeEnum.MANAGER,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"name must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid password type message", async () => {
			let result: any;

			try {
				result = await validation({
					id: "618c3566fd2594b90e6c9de9",
					name: changedName,
					password: 42 as any,
					role: changedRole,
					salary,
					userRole: RoleTypeEnum.MANAGER,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"password must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid role type message", async () => {
			let result: any;

			try {
				result = await validation({
					id: "618c3566fd2594b90e6c9de9",
					name: changedName,
					password: changedPassword,
					role: 42 as any,
					salary,
					userRole: RoleTypeEnum.MANAGER,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"role must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid salary type message", async () => {
			let result: any;

			try {
				result = await validation({
					id: "618c3566fd2594b90e6c9de9",
					name: changedName,
					password: changedPassword,
					role: changedRole,
					salary: "test" as any,
					userRole: RoleTypeEnum.MANAGER,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				'salary must be a `number` type, but the final value was: `"test"`.',
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid userRole type message", async () => {
			let result: any;

			try {
				result = await validation({
					id: "618c3566fd2594b90e6c9de9",
					name: changedName,
					password: changedPassword,
					role: changedRole,
					salary,
					userRole: 42 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"userRole must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
