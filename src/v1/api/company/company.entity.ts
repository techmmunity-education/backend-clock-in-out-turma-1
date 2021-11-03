import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

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
