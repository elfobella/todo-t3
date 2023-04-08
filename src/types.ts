import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allTodoOutput = RouterOutputs["todo"]["getAll"];
type allCategoryOutput = RouterOutputs["category"]["getAll"];
type allCategoryTodos = RouterOutputs["todo"]["filteredTodo"];

export type Cat = allCategoryOutput[number];
export type Todo = allTodoOutput[number];

export type EachCategoryTodo = allCategoryTodos[number];
