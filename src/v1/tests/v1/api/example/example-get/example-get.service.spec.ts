import { exampleMock } from "v1/tests/mocks/example";
import { exampleGet } from "v1/api/example/example-get/example-get.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("exampleGet service", () => {
	const validExampleField = "aa0d8a";

	let exampleMockDoc: any;

	beforeAll(() => {
		exampleMockDoc = exampleMock.doc({
			exampleField: validExampleField,
		});
	});

	describe("Successful", () => {
		it("should return a example", async () => {
			let result: any;

			exampleMock.repository.findOne.mockResolvedValue(exampleMockDoc);

			try {
				result = await exampleGet(
					{
						exampleRepository: exampleMock.repository,
					},
					{
						exampleField: validExampleField,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(exampleMockDoc);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a example not found message", async () => {
			let result: any;

			exampleMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await exampleGet(
					{
						exampleRepository: exampleMock.repository,
					},
					{
						exampleField: validExampleField,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Example not found");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
