import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { api } from "y/utils/api";

const CreateCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const trpc = api.useContext();

  const { mutate: createCat } = api.category.create.useMutation({
    onSettled: async () => {
      return await trpc.category.getAll.invalidate();
    },
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setIsOpen(false);
  //     }, 300);
  //   }, []);

  return (
    <div className="">
      <button
        onClick={handleClick}
        className="my-7 flex items-center justify-center space-x-1 rounded-full bg-gray-800 p-4 font-semibold text-stone-200 transition hover:bg-gray-800/90 dark:bg-stone-200  dark:text-gray-900 dark:hover:bg-stone-200/80"
      >
        <BsPlus className="h-7 w-7" />
      </button>
      {isOpen && (
        <div className={`my-4 flex space-x-1  transition duration-300`}>
          <input
            onKeyDown={(e) =>
              e.key === "Enter" ? (createCat(title), setTitle("")) : ""
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Create Category"
            className="rounded border border-gray-800 bg-transparent p-2 outline-none dark:border-gray-200  dark:focus:border-gray-400"
          />
          <button
            onClick={() => {
              setTitle("");
              createCat(title);
            }}
            className="rounded bg-gray-800 px-4 font-semibold text-gray-200 dark:bg-gray-200 dark:text-gray-800"
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
