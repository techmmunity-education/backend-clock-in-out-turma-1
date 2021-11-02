import { createConnection } from "typeorm";

// eslint-disable-next-line @typescript-eslint/naming-convention
const notIsPrd = process.env.NODE_ENV !== "production";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const connect = () =>
	createConnection({
		type: "mongodb",
		url: process.env.MONGODB_URL,
		synchronize: false,
		logging: notIsPrd,
		entities: [],
	});
