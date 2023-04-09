import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdArrowUpward, MdDelete } from "react-icons/md";
import { api } from "y/utils/api";
import Layout from "../Layout";

const CategoryPage = () => {
  const router = useRouter();
  const trpc = api.useContext();
  const [text, setText] = useState("");
  const catId =
    typeof router.query.catId === "string" ? router.query.catId : "";
  const { data: singleCat } = api.category.getOne.useQuery(catId);
  const { mutate: addTodo, isLoading } = api.category.createTodo.useMutation({
    onSuccess: async () => {
      return await trpc.todo.filteredTodo.invalidate();
    },
  });

  const { mutate: deleteTodo } = api.todo.delete.useMutation({
    onSettled: async () => {
      return await trpc.todo.filteredTodo.invalidate();
    },
  });

  const { mutate: checkTodo } = api.todo.check.useMutation({
    onSettled: async () => {
      return await trpc.todo.filteredTodo.invalidate();
    },
  });

  const handleAdd = () => {
    setText("");
    if (singleCat && singleCat.title) {
      addTodo({
        title: text,
        categoryId: singleCat.id,
      });
    } else {
      // Kategori tanımlı değilse, hata mesajı gösterilebilir veya farklı bir değer atanabilir.
      console.error("Category not defined.");
    }
  };

  const { data: todos } = api.todo.filteredTodo.useQuery(catId);

  return (
    <Layout>
      <div className="flex w-full flex-col ">
        <div className="flex">
          <p className="rounded-lg bg-gray-800 px-7 py-3 text-lg font-semibold text-stone-200">
            {singleCat?.title}
          </p>
        </div>
        <div className="mt-4 flex h-[250px] flex-col flex-wrap overflow-y-scroll rounded-t-lg bg-gray-800 p-4 text-stone-200 scrollbar scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 dark:bg-gray-700 dark:scrollbar-track-gray-700  md:h-[400px]">
          <div>
            {todos?.map((todo) => (
              <div
                className="group flex w-full items-center space-x-2 rounded p-2 hover:bg-gray-600"
                key={todo.id}
              >
                <input
                  type="checkbox"
                  onChange={() =>
                    checkTodo({ id: todo.id, isDone: !todo.isDone })
                  }
                  checked={todo.isDone}
                  name=""
                  id=""
                />
                <div
                  className={`relative flex-1 after:absolute after:left-0 after:top-[50%] after:h-[3px] ${
                    todo.isDone ? "text-stone-400 after:w-full" : "after:w-0"
                  }  overflow-hidden overflow-ellipsis text-lg after:bg-blue-500 after:transition-all after:content-[""] `}
                >
                  <p>{todo.title}</p>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={`${
                    todo.isDone ? "inline-block" : "hidden"
                  } rounded-full p-1 group-hover:inline-block`}
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2 rounded-b-lg bg-gray-800 p-2 dark:bg-gray-700 ">
          <input
            onKeyDown={(e) => (e.key === "Enter" ? handleAdd() : "")}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add"
            className="flex-1 rounded-lg  bg-gray-700 p-2 text-stone-200 outline-none dark:bg-stone-500/50"
          />
          <button
            disabled={isLoading || !text}
            onClick={handleAdd}
            className={`rounded-full ${
              isLoading ? "dark:bg-stone-500/50" : ""
            } cursor-pointer bg-gray-700 p-[10px] text-stone-200 transition duration-200 hover:bg-blue-500 dark:bg-stone-500 `}
          >
            <MdArrowUpward />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
