import React from "react";
import { MdDelete } from "react-icons/md";
import type { EachCategoryTodo } from "y/types";
import { api } from "y/utils/api";

interface CatProps {
  todo: EachCategoryTodo;
}

const CategoryTodo = ({ todo }: CatProps) => {
  const trpc = api.useContext();
  const { mutate: checkTodo } = api.todo.check.useMutation({
    onSettled: async () => {
      return await trpc.todo.filteredTodo.invalidate();
    },
  });
  const { mutate: deleteTodo } = api.todo.delete.useMutation({
    onSettled: async () => {
      return await trpc.todo.filteredTodo.invalidate();
    },
  });
  return (
    <div>
      <div className="group flex items-center space-x-2 rounded p-2 hover:bg-stone-500/50">
        <div className="flex h-5 items-center">
          <input
            defaultChecked={todo.isDone}
            onClick={() => {
              checkTodo({
                id: todo.id,
                isDone: !todo.isDone,
              });
            }}
            id="terms"
            type="checkbox"
            className="focus:ring-3 h-4 w-4 rounded-full border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
          />
        </div>
        <div className=" flex flex-1 items-center justify-center">
          <div
            className={` ${
              todo.isDone ? "text-stone-400 after:w-full" : "after:w-0"
            } relative  flex-1 font-semibold after:absolute after:top-[50%] after:block after:h-[2px] after:bg-blue-500 after:transition-all after:duration-200`}
          >
            <span>{todo.title}</span>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className={` rounded-full p-1 group-hover:block ${
              todo.isDone ? "block" : "hidden"
            }`}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryTodo;
