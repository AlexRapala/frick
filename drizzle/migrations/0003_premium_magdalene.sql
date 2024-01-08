CREATE TABLE `lifts` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`weight` text,
	`reps` text,
	`userId` text,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
