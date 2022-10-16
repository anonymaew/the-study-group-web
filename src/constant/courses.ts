import { faker } from '@faker-js/faker';
import { Company, Course } from '@prisma/client';

import { companies } from './companies';

export const getCourse = (id?: number, companyId?: Company): Course => {
  faker.seed(id);
  return {
    id: id?.toString() || faker.datatype.uuid(),
    name: faker.lorem.words(),
    detail: Array.from({ length: 3 }, () => faker.lorem.paragraph(10)).join(
      "\n\n"
    ),
    teacherId: id?.toString() || faker.datatype.uuid(),
    companyId: companyId || faker.helpers.arrayElement(companies),
    employeeId: id?.toString() || faker.datatype.uuid(),
    createdAt: faker.date.past(1, "2022-10-16T00:00:00.000Z"),
  };
};

export const getCourses = (): Course[] => {
  faker.seed(123);
  return Array.from({ length: 10 }, (v, k) =>
    getCourse(k, faker.helpers.arrayElement(companies))
  );
};
