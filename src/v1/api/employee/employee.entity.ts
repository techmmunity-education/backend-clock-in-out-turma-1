import { Column, Entity, ObjectIdColumn, Repository } from "typeorm";
import { ObjectId } from "mongodb";
import { RoleTypeEnum } from "v1/enum/role-types";
import { RepositoryKeys } from "v1/tests/mocks/repository";

@Entity("employers")
export class EmployeeEntity {
	@ObjectIdColumn({
		name: "_id",
	})
	public id: ObjectId;

	@Column()
	public cnpj: string;

	@Column()
	public cpf: string;

	@Column()
	public password: string;

	@Column()
	public role: RoleTypeEnum;

	@Column()
	public salary?: number;

	@Column({
		default: true,
	})
	public isValid: boolean;

	@Column()
	public firedAt?: Date;
}

export type EmployeeRepository = Pick<
	Repository<EmployeeEntity>,
	RepositoryKeys
>;
