import { Todo } from "@prisma/client";
import { reverse } from "dns";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { api } from "y/utils/api";
type TodoProps = {
  todo: Todo;
};

const EachTodo = ({ todo }: TodoProps) => {
  const trpc = api.useContext();

  const { isDone, title, id } = todo;
  const [isCreated, setIsCreated] = useState(true);
  const CREATED_CLASS = "scale-75 -mb-[calc(48px+12px)] opacity-5";
  const CREATED_DELAY = 0;
  const { mutate: deleteTodo } = api.todo.delete.useMutation({
    onSuccess: async () => {
      return await trpc.todo.getAll.invalidate();
    },
  });
  const taskRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setIsCreated(false);
    }, CREATED_DELAY);
  }, []);

  return (
    <div
      ref={taskRef}
      className={`
      duration-300
      ease-in-out
      ${isCreated ? CREATED_CLASS : ""}
      my-2
    `}
    >
      <div
        className={`w-[250px] rounded bg-gray-800 p-2 text-stone-100  transition duration-100 dark:bg-stone-100 dark:text-gray-800`}
      >
        <div className=" ">
          <div className="flex items-center">
            <span
              className={`${
                isDone ? "line-through" : ""
              } flex-1 overflow-hidden overflow-ellipsis`}
            >
              {" "}
              {title}{" "}
            </span>
            <button onClick={() => deleteTodo(id)}>
              <MdDelete className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachTodo;
