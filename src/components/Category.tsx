import React from "react";
import { Cat } from "y/types";

type CategoryProps = {
  category: Cat;
};

const Category = ({ category }: CategoryProps) => {
  const { id, title } = category;

  return <div>{title}</div>;
};

export default Category;
