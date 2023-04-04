import React from "react";
import { api } from "y/utils/api";
import EachTodo from "./EachTodo";

const TodoList = () => {
  const { data: todos } = api.todo.getAll.useQuery();

  return (
    <div className="">
      {todos?.map((todo) => (
        <EachTodo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
