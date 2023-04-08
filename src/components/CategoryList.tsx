import React from "react";
import { api } from "y/utils/api";
import Category from "./Category";
import Link from "next/link";

const CategoryList = () => {
  const { data: category } = api.category.getAll.useQuery();

  return (
    <div>
      <Link className="" href={`/`}>
        <div className="group flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700">
          <span className="flex-1">My Day</span>
        </div>
      </Link>
      <h1 className="mb-1 mt-4 px-4 text-lg font-bold">My Lists</h1>
      {category?.map((cat) => (
        <Category key={cat.id} category={cat} />
      ))}
    </div>
  );
};

export default CategoryList;
