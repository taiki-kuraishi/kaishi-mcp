import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const Syllabus = pgTable("syllabus", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(), // 講義名
  startTerm: integer("start_term").notNull(), // 開校時期
  endTerm: integer("end_term").notNull(), // 終了時期
  category: text("category").notNull(), // 分類
  credits: text("credits").notNull(), // 基準単位数
  dayOfWeek: integer("day_of_week").notNull(), // 代表曜日
  period: integer("period").notNull(), // 開講時限
  location: text("location").notNull(), // 校地
  isCompulsory: boolean("is_compulsory").notNull(), // 必修科目フラグ
  description: text("description").notNull(), // 概要
  learningObjectives: text("learning_objectives").notNull(), // 学習目標

  version: text("version").notNull(), // バージョン

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export type SelectSyllabus = InferSelectModel<typeof Syllabus>;
export type InsertSyllabus = InferInsertModel<typeof Syllabus>;
