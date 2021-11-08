import { createClockInOut } from "v1/api/clock-in-out/create/create-clock-in-out.service";
import { ClockInOutTypeEnum } from "v1/enum/clock-in-out-type";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { clockInOutMock } from "v1/tests/mocks/clock-in-out";
import { CustomError } from "v1/utils/error";

describe("create service", () => {
	const validCnpj = "39.407.242/0001-30";
	const validCpf = "867.020.740-00";
	const validType = ClockInOutTypeEnum.CLOCK_IN;
	const validReason = "asdfgghhhhkhjsiqu";

	describe("Successful", () => {
		const send = jest.fn();
		const reply = {
			status: jest.fn().mockReturnValue({ send }),
		};

		beforeEach(() => {
			reply.status.mockReturnValue({ send });
		});

		it("should return nothing with a created status code", async () => {
			let result: any;

			const clockInOut = await clockInOutMock.doc({
				cnpj: validCnpj,
				cpf: validCpf,
				type: validType,
				role: RoleTypeEnum.EMPLOYEE,
				createdAt: new Date(),
			});

			clockInOutMock.repository.save.mockResolvedValue(clockInOut);

			try {
				result = await createClockInOut(
					{
						clockInOutRepository: clockInOutMock.repository,
					},
					{
						cnpj: validCnpj,
						cpf: validCpf,
						type: validType,
						role: RoleTypeEnum.EMPLOYEE,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
		});

		it(`should return nothing with a created status code
		 after receiving isJustified, reason and createdAt params`, async () => {
			let result: any;

			const clockInOut = await clockInOutMock.doc({
				cnpj: validCnpj,
				cpf: validCpf,
				type: validType,
				role: RoleTypeEnum.HUMAN_RESOURCES,
				createdAt: new Date(2015, 4, 6),
				isJustified: true,
				reason: validReason,
			});

			clockInOutMock.repository.save.mockResolvedValue(clockInOut);

			try {
				result = await createClockInOut(
					{
						clockInOutRepository: clockInOutMock.repository,
					},
					{
						cnpj: validCnpj,
						cpf: validCpf,
						type: validType,
						role: RoleTypeEnum.HUMAN_RESOURCES,
						createdAt: new Date(2015, 4, 6),
						isJustified: true,
						reason: validReason,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
		});
	});

	describe("Failure", () => {
		it(`should throw a CustomError with a Unauthorized error message after
		user tries to insert createdAt param without permission`, async () => {
			let result: any;

			try {
				result = await createClockInOut(
					{
						clockInOutRepository: clockInOutMock.repository,
					},
					{
						cnpj: validCnpj,
						cpf: validCpf,
						type: validType,
						role: RoleTypeEnum.EMPLOYEE,
						createdAt: new Date(2013, 3, 3),
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Unauthorized");
			expect(result.statusCode).toBe(StatusCodeEnum.UNAUTHORIZED);
		});

		it(`should throw a CustomError with a Unauthorized error message after
		 user tries to insert isJustified param without permission`, async () => {
			let result: any;

			try {
				result = await createClockInOut(
					{
						clockInOutRepository: clockInOutMock.repository,
					},
					{
						cnpj: validCnpj,
						cpf: validCpf,
						type: validType,
						role: RoleTypeEnum.EMPLOYEE,
						isJustified: true,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Unauthorized");
			expect(result.statusCode).toBe(StatusCodeEnum.UNAUTHORIZED);
		});

		it(`should throw a CustomError with a Unauthorized error message after
		user tries to insert reason param without permission`, async () => {
			let result: any;

			try {
				result = await createClockInOut(
					{
						clockInOutRepository: clockInOutMock.repository,
					},
					{
						cnpj: validCnpj,
						cpf: validCpf,
						type: validType,
						role: RoleTypeEnum.EMPLOYEE,
						reason: validReason,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Unauthorized");
			expect(result.statusCode).toBe(StatusCodeEnum.UNAUTHORIZED);
		});
	});
});
