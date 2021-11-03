import { RepositoryKeys } from "v1/tests/mocks/repository";
import { Column, Entity, Repository, ObjectIdColumn } from "typeorm";

@Entity("user")
export class UserEntity {
	@ObjectIdColumn({
		name: "_id",
	})
	public id: string;

	@Column()
	public email: string;

	@Column()
	public password: string;
}

export type UserRepository = Pick<Repository<UserEntity>, RepositoryKeys>;
