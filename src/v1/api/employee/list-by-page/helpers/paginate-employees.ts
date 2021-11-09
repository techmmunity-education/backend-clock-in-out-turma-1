const DEFAULT = 1;
const employeesPerPage = 15;

export const paginateEmployees = (page?: number) => {
	// Remove 1 from the index of the page to start at 0.
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const pageWithRightIndex = (page || DEFAULT) - 1;

	const employeesToSkip = pageWithRightIndex * employeesPerPage;

	return employeesToSkip;
};
