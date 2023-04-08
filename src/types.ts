import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allTodoOutput = RouterOutputs["todo"]["getAll"];
type allCategoryOutput = RouterOutputs["category"]["getAll"];
type allCategoryTodos = RouterOutputs["todo"]["getAll"];

export type Todo = allTodoOutput[number];

export type EachCategoryTodo = allCategoryTodos[number];

export type Cat = allCategoryOutput[number];
