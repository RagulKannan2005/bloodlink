CREATE TABLE `Seeker` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`Bloodtype` text NOT NULL,
	`TimeofNeed` text NOT NULL,
	`hospitalname` text NOT NULL,
	`units` integer NOT NULL,
	`reason` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `Hospital` ADD `type` text NOT NULL;