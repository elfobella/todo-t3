import React from "react";
import CategoryList from "y/components/CategoryList";
import CreateCategory from "y/components/CreateCategory";
import ThemeSwitcher from "y/components/ThemeSwitcher";

type ChildrenProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: ChildrenProps) => {
  return (
    <div className="flex min-h-screen justify-center space-x-7 bg-gray-200  p-7 transition-all  dark:bg-gray-800 dark:text-gray-200 md:justify-start">
      <div className="flex flex-col  space-x-4 md:flex-row">
        <div className="w-[280px] ">
          <CreateCategory />
          <CategoryList />
        </div>
        {children}
      </div>
      <div className="absolute right-5 top-5">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Layout;
