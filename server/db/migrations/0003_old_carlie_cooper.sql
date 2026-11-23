ALTER TABLE "settings" RENAME COLUMN "day_dealine" TO "day_deadline";--> statement-breakpoint
ALTER TABLE "task_logs" ADD COLUMN "value" integer NOT NULL;