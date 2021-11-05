import { verify as verifyJwt } from "jsonwebtoken";
import { Payload } from "./types";

export const verify = (token: string) => {
	try {
		const payload = verifyJwt(token, process.env.JWT_PRIVATE_KEY as string);

		return payload as Payload;
	} catch (_) {
		return false;
	}
};
