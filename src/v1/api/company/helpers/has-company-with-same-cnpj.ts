import { CompanyRepository } from "../company.entity";

interface HasCompanyWithSameCnpj {
	companyRepository: CompanyRepository;
	cnpj: string;
}

export const hasCompanyWithSameCnpj = async ({
	companyRepository,
	cnpj,
}: HasCompanyWithSameCnpj) => {
	if (await companyRepository.findOne({ where: { cnpj } })) {
		return true;
	}

	return false;
};
