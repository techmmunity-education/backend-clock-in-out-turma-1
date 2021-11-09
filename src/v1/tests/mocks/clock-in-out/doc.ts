import { ClockInOutTypeEnum } from "v1/enum/clock-in-out-type";
import { RoleTypeEnum } from "v1/enum/role-types";
import { ObjectId } from "mongodb";

export interface CreateDoc {
	id?: string;
	cnpj: string;
	cpf: string;
	createdAt?: Date;
	type: ClockInOutTypeEnum;
	isJustified?: boolean;
	reason?: string;
	role: RoleTypeEnum;
}

export const doc = ({
	id,
	cnpj,
	cpf,
	createdAt,
	type,
	isJustified,
	reason,
	role,
}: CreateDoc) => ({
	id: new ObjectId(id),
	cnpj,
	cpf,
	createdAt,
	type,
	isJustified,
	reason,
	role,
});
