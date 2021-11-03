import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";
import { ClockInOutTypeEnum } from "v1/enum/clock-in-out-type";

@Entity()
export class ClockInOutEntity {
	@ObjectIdColumn({
		name: "_id",
	})
	public id: ObjectId;

	@Column()
	public userId: string;

	@Column()
	public companyId: string;

	@Column()
	public createdAt: Date;

	@Column()
	public type: ClockInOutTypeEnum;

	@Column()
	public justified: boolean;

	@Column()
	public reason: string;
}
