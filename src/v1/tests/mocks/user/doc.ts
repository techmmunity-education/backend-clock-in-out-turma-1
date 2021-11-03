import { encrypt } from "v1/utils/encrypt/encrypt";

export interface CreateDoc {
	email: string;
	password: string;
}

export const doc = async ({ email, password }: CreateDoc) => ({
	email,
	password: await encrypt(password),
});
