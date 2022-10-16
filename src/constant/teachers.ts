import { faker } from '@faker-js/faker';
import { Company, Employee, MainCompany, Permission, Teacher } from '@prisma/client';

import { companies } from './companies';

export const getTeacher = (id: number): Teacher => {
  faker.seed(id);
  return {
    id: id.toString(),
    name: faker.name.firstName() + " " + faker.name.lastName(),
    description: Array.from({ length: 3 }, () =>
      faker.lorem.paragraph(10)
    ).join("\n\n"),
    companyId: faker.helpers
      .arrayElement(companies)
      .toLowerCase()
      .replace(/_/g, "-"),
  };
};

export const getTeachers = (): Teacher[] => {
  return Array.from({ length: 10 }, (v, k) => getTeacher(k));
};

export const employee = (
  companies: MainCompany[],
  permissions: Permission[]
): Employee => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName() + " " + faker.name.lastName(),
    birthday: faker.date.past(),
    phone: faker.phone.number(),
    companyId: faker.helpers.arrayElement(companies).id,
    permissionId: faker.helpers.arrayElement(permissions).id,
  };
};
