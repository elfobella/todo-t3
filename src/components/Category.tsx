import React from "react";
import { MdDelete } from "react-icons/md";
import type { Cat } from "y/types";

type CategoryProps = {
  category: Cat;
};

const Category = ({ category }: CategoryProps) => {
  const { title } = category;

  return (
    <div className="">
      <div className="group flex cursor-pointer items-center rounded px-4 py-1 hover:bg-gray-300 dark:hover:bg-gray-700">
        <span className="flex-1">{title}</span>
        <button className="hidden group-hover:inline-block">
          <MdDelete className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default Category;
