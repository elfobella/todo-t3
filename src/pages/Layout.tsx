import React from "react";
import CategoryList from "y/components/CategoryList";
import CreateCategory from "y/components/CreateCategory";
import ThemeSwitcher from "y/components/ThemeSwitcher";

type ChildrenProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: ChildrenProps) => {
  return (
    <div className="flex min-h-screen w-full justify-between space-x-7 bg-gray-200 p-7  transition-all dark:bg-gray-800 dark:text-gray-200">
      <div className="flex  space-x-4">
        <div>
          <CreateCategory />
          <CategoryList />
        </div>
        {children}
      </div>
      <ThemeSwitcher />
    </div>
  );
};

export default Layout;
