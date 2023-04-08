import React from "react";
import TodoList from "./TodoList";

const Todo = () => {
  return (
    <div className="flex w-full justify-start space-x-7 ">
      <div className="">
        <TodoList />
      </div>
    </div>
  );
};

export default Todo;
