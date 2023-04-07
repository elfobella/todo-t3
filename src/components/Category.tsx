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
      <Link className="" href={`/list/${id}`}>
        <div className="group flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700">
          <span className="flex-1">{title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteCategory(id);
            }}
            className="hidden rounded-full p-1 transition hover:bg-gray-500/70 group-hover:inline-block"
          >
            <MdDelete className="text-red-500" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Category;
