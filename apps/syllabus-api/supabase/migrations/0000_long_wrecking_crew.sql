CREATE TABLE "syllabus" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"start_term" integer NOT NULL,
	"end_term" integer NOT NULL,
	"category" text NOT NULL,
	"credits" text NOT NULL,
	"day_of_week" integer NOT NULL,
	"period" integer NOT NULL,
	"location" text NOT NULL,
	"is_compulsory" boolean,
	"description" text NOT NULL,
	"learning_objectives" text NOT NULL,
	"version" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "syllabus_name_unique" UNIQUE("name")
);
