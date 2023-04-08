import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdArrowUpward } from "react-icons/md";
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

  const { data: todos } = api.todo.filteredTodo.useQuery(catId);

  console.log(todos);

  return (
    <Layout>
      <div className="relative">
        <div>
          <p className="text-lg font-semibold">{singleCat?.title}</p>
        </div>
        <div className="my-4">
          {todos?.map((todo) => (
            <div key={todo.id}>{todo.title}</div>
          ))}
        </div>
        <div className="absolute bottom-0 flex items-center space-x-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add"
            className="flex-1 rounded-lg bg-gray-800 p-2 text-stone-200 outline-none dark:bg-stone-500/50"
          />
          <button
            disabled={isLoading || !text}
            onClick={() => {
              setText("");
              if (singleCat && singleCat.title) {
                addTodo({
                  title: text,
                  id: singleCat.id,
                });
              } else {
                // Kategori tanımlı değilse, hata mesajı gösterilebilir veya farklı bir değer atanabilir.
                console.error("Category not defined.");
              }
            }}
            className={`rounded-full ${
              isLoading ? "dark:bg-stone-500/50" : ""
            } cursor-pointer bg-gray-800 p-[10px] text-stone-200 transition duration-200 hover:bg-blue-500 dark:bg-stone-500 `}
          >
            <MdArrowUpward />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
