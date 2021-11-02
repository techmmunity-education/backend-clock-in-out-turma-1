import { createConnection } from "typeorm";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const connect = () =>
	createConnection({
		type: "mongodb",
		url: process.env.MONGODB_URL,
		synchronize: false,
		logging: process.env.NODE_ENV !== "production",
		entities: [],
	});
