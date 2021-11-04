import {
	Column,
	CreateDateColumn,
	Entity,
	ObjectIdColumn,
	Repository,
} from "typeorm";
import { ObjectId } from "mongodb";
import { RepositoryKeys } from "v1/tests/mocks/repository";

@Entity("companies")
export class CompanyEntity {
	@ObjectIdColumn({
		name: "_id",
	})
	public id: ObjectId;

	@Column()
	public cnpj: string;

	@Column()
	public name: string;

	@CreateDateColumn()
	public createdAt: Date;
}

export type CompanyRepository = Pick<Repository<CompanyEntity>, RepositoryKeys>;
