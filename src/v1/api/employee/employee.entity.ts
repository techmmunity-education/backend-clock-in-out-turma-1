import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";
import { RoleTypeEnum } from "v1/enum/role-types";

@Entity("employers")
export class EmployeeEntity {
	@ObjectIdColumn({
		name: "_id",
	})
	public id: ObjectId;

	@Column()
	public cpf: string;

	@Column()
	public password: string;

	@Column()
	public role: RoleTypeEnum;

	@Column()
	public salary: number;

	@Column({
		default: true,
	})
	public isValid: boolean;

	@Column()
	public firedAt: Date;
}
