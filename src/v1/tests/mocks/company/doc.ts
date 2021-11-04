import { ObjectId } from "mongodb";

export interface CreateDoc {
	id?: string;
	cnpj: string;
	name: string;
	createdAt: Date;
}

export const doc = ({ id, cnpj, name, createdAt }: CreateDoc) => ({
	id: new ObjectId(id),
	cnpj,
	name,
	createdAt,
});
