CREATE TYPE "public"."frequency" AS ENUM('daily', 'weekdays', 'times_per_week');--> statement-breakpoint
CREATE TYPE "public"."task_type" AS ENUM('binary', 'quantity', 'duration');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tasks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"category_id" integer NOT NULL,
	"title" text NOT NULL,
	"type" "task_type" NOT NULL,
	"target_value" integer,
	"unit" text,
	"frequency" "frequency" NOT NULL,
	"weekdays" integer[],
	"times_per_week" integer,
	"is_required" boolean DEFAULT true NOT NULL,
	"active_from" date NOT NULL,
	"archived_on" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;