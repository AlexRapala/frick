import { lifts, tasks } from "@/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

type Task = InferSelectModel<typeof tasks>;
type Lift = InferSelectModel<typeof lifts>;
