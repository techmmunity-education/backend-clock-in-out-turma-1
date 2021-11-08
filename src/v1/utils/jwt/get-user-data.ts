import { decode } from "jsonwebtoken";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "../error";
import { Payload } from "./types";

export const getUserData = (token: string) => {
	if (typeof token !== "string") {
		throw new CustomError("Invalid token", StatusCodeEnum.INTERNAL);
	}

	const decodedPayload = decode(token);

	return decodedPayload as Payload;
};
