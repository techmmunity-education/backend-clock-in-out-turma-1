import { createConnection } from "typeorm";

const { NODE_ENV } = process.env;

// eslint-disable-next-line @typescript-eslint/naming-convention
const notIsPrd = NODE_ENV !== "production";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const connect = () =>
	createConnection({
		type: "database" as any,
		synchronize: false,
		logging: notIsPrd,
		entities: [],
	});
