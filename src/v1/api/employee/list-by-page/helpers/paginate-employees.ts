const DEFAULT = 1;
export const EMPLOYEES_PER_PAGE = 15;

export const paginateEmployees = (page?: number) => {
	// Remove 1 from the index of the page to start at 0.
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const pageWithRightIndex = (page || DEFAULT) - 1;

	const employeesToSkip = pageWithRightIndex * EMPLOYEES_PER_PAGE;

	return employeesToSkip;
};
