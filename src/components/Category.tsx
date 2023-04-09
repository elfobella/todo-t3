import Link from "next/link";
import React from "react";
import { MdDelete } from "react-icons/md";
import type { Cat } from "y/types";
import { api } from "y/utils/api";

type CategoryProps = {
  category: Cat;
};

const Category = ({ category }: CategoryProps) => {
  const { title, id } = category;
  const trpc = api.useContext();
  const { mutate: deleteCategory } = api.category.delete.useMutation({
    onSettled: async () => {
      return await trpc.category.getAll.invalidate();
    },
  });

  return (
    <div className="">
      <div className="group flex  cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700">
        <Link className="flex-1" href={`/list/${id}`}>
          <span className="">{title}</span>
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteCategory(id);
          }}
          className="hidden rounded-full p-1 transition group-hover:inline-block hover:bg-gray-500/70"
        >
          <MdDelete className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default Category;
