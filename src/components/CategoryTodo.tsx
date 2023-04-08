import React from "react";
import { CategoryTodo } from "y/types";

interface CatProps {
  todo: CategoryTodo;
}

const CategoryTodo = ({ todo }: CatProps) => {
  return (
    <div>
      <div className="rounded p-2 hover:bg-stone-500/50">
        <span>{todo.title}</span>
      </div>
    </div>
  );
};

export default CategoryTodo;
