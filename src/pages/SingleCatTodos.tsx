import React from "react";
import type { EachCategoryTodo } from "y/types";

type TodoProps = {
  todo: EachCategoryTodo;
};

const SingleCatTodos = ({ todo }: TodoProps) => {
  return <div>{todo.title}</div>;
};

export default SingleCatTodos;
