import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const Todo = () => {
  return (
    <div className="flex max-w-3xl flex-col items-center ">
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Todo;
