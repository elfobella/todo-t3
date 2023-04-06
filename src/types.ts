import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allTodoOutput = RouterOutputs["todo"]["getAll"];
type allCategoryOutput = RouterOutputs["category"]["getAll"];

export type Todo = allTodoOutput[number];

export type Cat = allCategoryOutput[number];
