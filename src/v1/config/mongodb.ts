import { createConnection } from "typeorm";
import { ClockInOutEntity } from "v1/api/clock-in-out/clock-in-out.entity";
import { CompanyEntity } from "v1/api/company/company.entity";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const connect = () =>
	createConnection({
		type: "mongodb",
		url: process.env.MONGODB_URL,
		synchronize: false,
		logging: process.env.NODE_ENV !== "production",
		entities: [CompanyEntity, ClockInOutEntity],
	});
