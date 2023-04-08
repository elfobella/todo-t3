import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdArrowUpward } from "react-icons/md";
import { api } from "y/utils/api";
import Layout from "../Layout";
import SingleCatTodos from "../SingleCatTodos";

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
      <div className=" flex flex-col">
        <p className="text-lg font-semibold">{singleCat?.title}</p>
        <div className=" crollbar mt-4 flex h-[80%] max-h-[450px] w-[420px] flex-1 flex-col overflow-y-scroll rounded-t-lg bg-gray-800 p-4 text-stone-200 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 dark:bg-gray-700  dark:scrollbar-track-gray-700">
          <div>
            {todos?.map((todo) => (
              <SingleCatTodos key={todo.id} todo={todo} />
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
