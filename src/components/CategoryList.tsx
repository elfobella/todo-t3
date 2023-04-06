import React from "react";
import { api } from "y/utils/api";
import Category from "./Category";

const CategoryList = () => {
  const { data: category } = api.category.getAll.useQuery();

  return (
    <div>
      {category?.map((cat) => (
        <Category key={cat.id} category={cat} />
      ))}
    </div>
  );
};

export default CategoryList;
