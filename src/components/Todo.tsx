import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import CreateCategory from "./CreateCategory";
import CategoryList from "./CategoryList";

const Todo = () => {
  return (
    <div className="flex w-full justify-center space-x-7 ">
      <div className="">
        <div className="">
          <CreateCategory />
          <CategoryList />
        </div>
      </div>
      <div className="">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
};

export default Todo;
