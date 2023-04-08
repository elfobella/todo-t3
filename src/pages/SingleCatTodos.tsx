import React from "react";
import type { Todo } from "y/types";

type TodoProps = {
  todo: Todo;
};

const SingleCatTodos = ({ todo }: TodoProps) => {
  return <div>{todo.title}</div>;
};

export default SingleCatTodos;
