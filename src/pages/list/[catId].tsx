import { useRouter } from "next/router";
import React from "react";
import { MdArrowUpward } from "react-icons/md";
import { api } from "y/utils/api";
import Layout from "../Layout";

const CategoryPage = () => {
  const router = useRouter();
  const trpc = api.useContext();
  const catId =
    typeof router.query.catId === "string" ? router.query.catId : "";
  const { data } = api.todo.filteredTodo.useQuery(catId);
  console.log("Data:", data);
  const { mutate: addTodo, isLoading } = api.todo.create.useMutation({
    onSuccess: async () => {
      return await trpc.todo.getAll.invalidate();
    },
  });

  return (
    <Layout>
      <div className="flex w-full flex-col justify-between">
        <div>
          <span> {catId} </span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add"
            className="flex-1 rounded-lg bg-stone-500/50 p-2 outline-none"
          />
          <button className="rounded-full bg-stone-500/50 p-3 transition duration-300 hover:bg-blue-500">
            <MdArrowUpward />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
