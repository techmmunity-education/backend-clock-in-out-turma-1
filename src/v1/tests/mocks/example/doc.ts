export interface CreateDoc {
	id?: string;

	exampleField: string;
}

export const doc = ({ exampleField, id }: CreateDoc) => ({
	id: id || "pinto",
	exampleField,
});
