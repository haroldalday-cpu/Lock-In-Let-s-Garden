CREATE TYPE "public"."day_status" AS ENUM('complete', 'failed', 'grace');--> statement-breakpoint
CREATE TABLE "day_records" (
	"date" date PRIMARY KEY NOT NULL,
	"score" integer NOT NULL,
	"status" "day_status" NOT NULL,
	"closed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"timezone" text DEFAULT 'Asia/Manila' NOT NULL,
	"day_dealine" time DEFAULT '00:00' NOT NULL,
	"grace_tokens_per_week" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "settings_single_row" CHECK ("settings"."id" = 1)
);
--> statement-breakpoint
CREATE TABLE "task_logs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "task_logs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"task_id" integer NOT NULL,
	"date" date NOT NULL,
	"proof_note" text,
	"logged_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "task_logs_task_date_unique" UNIQUE("task_id","date")
);
--> statement-breakpoint
ALTER TABLE "task_logs" ADD CONSTRAINT "task_logs_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE restrict ON UPDATE no action;