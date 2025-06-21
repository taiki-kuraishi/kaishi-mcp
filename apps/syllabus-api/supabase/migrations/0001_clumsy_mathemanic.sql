ALTER TABLE "syllabus" DROP CONSTRAINT "syllabus_name_unique";--> statement-breakpoint
ALTER TABLE "syllabus" ALTER COLUMN "is_compulsory" SET NOT NULL;
