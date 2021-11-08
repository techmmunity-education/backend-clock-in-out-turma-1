import { validation } from "v1/api/clock-in-out/create/create-clock-in-out-validation";
import { ClockInOutParams } from "v1/api/clock-in-out/create/create-clock-in-out.service";
import { ClockInOutTypeEnum } from "v1/enum/clock-in-out-type";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("create validation", () => {
	const validCnpj = "39.407.242/0001-30";
	const validCpf = "867.020.740-00";
	const validType = ClockInOutTypeEnum.CLOCK_IN;
	const validReason = "asdfgghhhhkhjsiqu";

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					type: validType,
					role: RoleTypeEnum.EMPLOYEE,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				cnpj: validCnpj,
				cpf: validCpf,
				type: validType,
				role: RoleTypeEnum.EMPLOYEE,
			});
		});

		it("should return validated params after all params have been supplied", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					type: validType,
					role: RoleTypeEnum.HUMAN_RESOURCES,
					createdAt: new Date(2020, 1, 1),
					isJustified: true,
					reason: validReason,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				cnpj: validCnpj,
				cpf: validCpf,
				type: validType,
				role: RoleTypeEnum.HUMAN_RESOURCES,
				createdAt: new Date(2020, 1, 1),
				isJustified: true,
				reason: validReason,
			});
		});
	});

	describe("Invalid params", () => {
		it("should throw a CustomError with a invalid, too long, reason param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					type: validType,
					createdAt: new Date(2016, 8, 7),
					role: RoleTypeEnum.HUMAN_RESOURCES,
					isJustified: true,
					reason: "a".repeat(5001),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("reason must be at most 5000 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with a undefined cnpj param message", async () => {
			let result: any;

			try {
				result = await validation({
					cpf: validCpf,
					type: validType,
					role: RoleTypeEnum.EMPLOYEE,
				} as ClockInOutParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("cnpj is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined cpf param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					type: validType,
					role: RoleTypeEnum.EMPLOYEE,
				} as ClockInOutParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("cpf is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined type param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					role: RoleTypeEnum.EMPLOYEE,
				} as ClockInOutParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("type is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined role param message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					type: validType,
				} as ClockInOutParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("role is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should return a CustomError with a invalid cnpj type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: 42 as any,
					cpf: validCpf,
					type: validType,
					role: RoleTypeEnum.EMPLOYEE,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"cnpj must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid cpf type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: 42 as any,
					type: validType,
					role: RoleTypeEnum.EMPLOYEE,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"cpf must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid type type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					type: 42 as any,
					role: RoleTypeEnum.EMPLOYEE,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"type must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid role type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					type: validType,
					role: 42 as any,
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

		it("should return a CustomError with a invalid createdAt type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					type: validType,
					role: RoleTypeEnum.HUMAN_RESOURCES,
					createdAt: "fa8s97f" as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				'createdAt must be a `date` type, but the final value was: `Invalid Date` (cast from the value `"fa8s97f"`).',
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid isJustified type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					type: validType,
					role: RoleTypeEnum.HUMAN_RESOURCES,
					isJustified: 42 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"isJustified must be a `boolean` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid reason type message", async () => {
			let result: any;

			try {
				result = await validation({
					cnpj: validCnpj,
					cpf: validCpf,
					type: validType,
					role: RoleTypeEnum.HUMAN_RESOURCES,
					reason: 42 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"reason must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
