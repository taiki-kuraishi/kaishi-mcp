import { faker } from "@faker-js/faker";
import type { InsertSyllabus, SelectSyllabus } from "../../src/models/syllabus";
import { Syllabus } from "../../src/models/syllabus";
import { AbstractFactory } from "./AbstractFactory";

export class SyllabusFactory extends AbstractFactory<InsertSyllabus> {
  make(override?: Partial<InsertSyllabus>): InsertSyllabus {
    const defaultData: InsertSyllabus = {
      name: faker.lorem.words(3),
      startTerm: faker.number.int({ min: 1, max: 4 }),
      endTerm: faker.number.int({ min: 1, max: 4 }),
      category: faker.helpers.arrayElement(["講義", "実習", "演習", "実験"]),
      credits: faker.helpers.arrayElement(["1", "2", "3", "4"]),
      dayOfWeek: faker.number.int({ min: 1, max: 7 }),
      period: faker.number.int({ min: 1, max: 6 }),
      location: faker.helpers.arrayElement([
        "米山キャンパス",
        "本町キャンパス",
        "長岡キャンパス",
        "新潟キャンパス",
      ]),
      isCompulsory: faker.datatype.boolean(),
      description: faker.lorem.paragraphs(2),
      learningObjectives: faker.lorem.paragraphs(1),
      version: "1.0",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    return { ...defaultData, ...override };
  }

  async create(override?: Partial<InsertSyllabus>): Promise<SelectSyllabus> {
    const data = this.make(override);
    const [result] = await this.db.insert(Syllabus).values(data).returning();
    if (!result) {
      throw new Error("Failed to create syllabus");
    }
    return result;
  }
}
