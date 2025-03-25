CREATE TABLE `Donor` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`age` integer NOT NULL,
	`gender` text NOT NULL,
	`dob` text NOT NULL,
	`bloodtype` text NOT NULL,
	`phone` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`verified` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Hospital` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`street` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zip` text NOT NULL,
	`phone` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Seeker` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`gender` text NOT NULL,
	`bloodtype` text NOT NULL,
	`TimeofNeed` text NOT NULL,
	`units` integer NOT NULL,
	`reason` text NOT NULL,
	`phone` text NOT NULL,
	`hospital_id` integer,
	FOREIGN KEY (`hospital_id`) REFERENCES `Hospital`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Testcenter` (
	`id` integer PRIMARY KEY NOT NULL,
	`cname` text NOT NULL,
	`cphone` text NOT NULL,
	`caddress` text NOT NULL,
	`daycapacity` integer NOT NULL,
	`managername` text NOT NULL,
	`managerphone` text NOT NULL,
	`licenceno` text NOT NULL,
	`password` text NOT NULL,
	`regdate` text NOT NULL,
	`labfacility` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Testdetails` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`address` text NOT NULL,
	`bloodtype` text NOT NULL,
	`gender` text NOT NULL,
	`hgb` text NOT NULL,
	`wbc` text NOT NULL,
	`rbc` text NOT NULL,
	`plt` text NOT NULL,
	`testdate` text NOT NULL,
	`testid` text NOT NULL,
	`testcenter_id` integer,
	FOREIGN KEY (`testcenter_id`) REFERENCES `Testcenter`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phoneno` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text NOT NULL
);
