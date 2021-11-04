import { RoleTypeEnum } from "v1/enum/role-types";
import { ObjectId } from "mongodb";
import { encrypt } from "v1/utils/encrypt/encrypt";

export interface CreateDoc {
	id?: string;
	cnpj: string;
	cpf: string;
	password: string;
	role: RoleTypeEnum;
	salary?: number;
	isValid: boolean;
	firedAt?: Date;
}

export const doc = async ({
	id,
	cnpj,
	cpf,
	password,
	role,
	salary,
	isValid,
	firedAt,
}: CreateDoc) => ({
	id: new ObjectId(id),
	cnpj,
	cpf,
	password: await encrypt(password),
	role,
	salary,
	isValid,
	firedAt,
});
