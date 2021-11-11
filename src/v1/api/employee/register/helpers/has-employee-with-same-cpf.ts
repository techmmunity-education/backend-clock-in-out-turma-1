import { EmployeeRepository } from "../../employee.entity";

interface HasEmployeeWithSameCpf {
	employeeRepository: EmployeeRepository;
	cpf: string;
}

export const hasEmployeeWithSameCpf = async ({
	employeeRepository,
	cpf,
}: HasEmployeeWithSameCpf) => {
	if (await employeeRepository.findOne({ where: { cpf } })) {
		return true;
	}

	return false;
};
