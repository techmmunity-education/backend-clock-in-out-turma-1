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
	params: ClockInOutParams,
) => {
	const hasJustified = params.isJustified !== undefined;
	const hasReason = params.reason !== undefined;
	const canSetDate = params.createdAt !== undefined;
	const isEmployee = params.role === RoleTypeEnum.EMPLOYEE;

	if ((hasJustified || hasReason || canSetDate) && isEmployee) {
		throw new CustomError("Unauthorized", StatusCodeEnum.UNAUTHORIZED);
	}

	let clockInOutData = {};

	if (isEmployee) {
		clockInOutData = {
			companyId: params.cnpj,
			userId: params.cpf,
			createdAt: new Date(),
			type: params.type,
		};
	} else {
		clockInOutData = {
			companyId: params.cnpj,
			userId: params.cpf,
			createdAt: params.createdAt,
			type: params.type,
			isJustified: params.isJustified,
			reason: params.reason,
		};
	}

	await clockInOutRepository.save(clockInOutData);
};
