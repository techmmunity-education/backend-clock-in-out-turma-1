import { FastifyInstance } from "fastify";
import { setClockInOutController } from "./api/clock-in-out/clock-in-out.controller";
import { setCompanyController } from "./api/company/company.controller";
import { setEmployeeController } from "./api/employee/employee.controller";
import { API_VERSION } from "./config";

export const setV1Controller = (fastify: FastifyInstance) => {
	setCompanyController(fastify, API_VERSION);
	setEmployeeController(fastify, API_VERSION);
	setClockInOutController(fastify, API_VERSION);
};
