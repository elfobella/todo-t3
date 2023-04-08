import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allTodoOutput = RouterOutputs["todo"]["getAll"];
type allCategoryOutput = RouterOutputs["category"]["getAll"];
type allCategoryTodos = RouterOutputs["todo"]["filteredTodo"];

export type Todo = allTodoOutput[number];

export type CategoryTodo = allCategoryTodos[number];

export type Cat = allCategoryOutput[number];
