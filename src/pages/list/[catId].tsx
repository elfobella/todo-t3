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
  const { mutate: addTodo, isLoading } = api.todo.create.useMutation({
    onSuccess: async () => {
      return await trpc.todo.getAll.invalidate();
    },
  });

  return (
    <Layout>
      <div className="flex flex-col justify-between">
        <div className="flex ">
          <p className="rounded-lg bg-gray-900/70 px-4 py-2">
            <span>{singleCat?.title}</span>
          </p>
        </div>
        <div className="flex items-center  space-x-2 ">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add"
            className="flex-1 rounded-lg bg-stone-500/50 p-2 outline-none"
          />
          <button
            disabled={isLoading || !text}
            onClick={() => {
              setText("");
              addTodo({ title: text, isDone: false });
            }}
            className={`rounded-full ${
              isLoading ? "bg-stone-500/50" : ""
            } cursor-pointer bg-stone-500 p-[10px] transition duration-200 hover:bg-blue-500 `}
          >
            <MdArrowUpward />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
