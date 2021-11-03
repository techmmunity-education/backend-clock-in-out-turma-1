import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("absence")
export class AbsenceEntity {
	@ObjectIdColumn({
		name: "_id",
	})
	public id: ObjectId;

	@Column()
	public userId: string;

	@Column()
	public companyId: string;

	@Column()
	public date: Date;

	@Column()
	public justification: string;
}
