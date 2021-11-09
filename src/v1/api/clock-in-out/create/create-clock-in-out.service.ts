import { ClockInOutTypeEnum } from "v1/enum/clock-in-out-type";
import { RoleTypeEnum } from "v1/enum/role-types";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { ClockInOutRepository } from "../clock-in-out.entity";

interface Injectables {
	clockInOutRepository: ClockInOutRepository;
}

export interface ClockInOutParams {
	cnpj: string;
	cpf: string;
	createdAt?: Date;
	type: ClockInOutTypeEnum;
	isJustified?: boolean;
	reason?: string;
	role: RoleTypeEnum;
}

export const createClockInOut = async (
	{ clockInOutRepository }: Injectables,
	{ cnpj, cpf, createdAt, type, isJustified, reason, role }: ClockInOutParams,
) => {
	const hasJustified = isJustified !== undefined;
	const hasReason = reason !== undefined;
	const canSetDate = createdAt !== undefined;
	const isEmployee = role === RoleTypeEnum.EMPLOYEE;

	if ((hasJustified || hasReason || canSetDate) && isEmployee) {
		throw new CustomError("Unauthorized", StatusCodeEnum.UNAUTHORIZED);
	}

	let clockInOutData = {};

	if (isEmployee) {
		clockInOutData = {
			companyId: cnpj,
			userId: cpf,
			createdAt: new Date(),
			type,
		};
	} else {
		clockInOutData = {
			companyId: cnpj,
			userId: cpf,
			createdAt,
			type,
			isJustified,
			reason,
		};
	}

	await clockInOutRepository.save(clockInOutData);
};
