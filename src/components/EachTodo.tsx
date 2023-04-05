import type { Todo } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete, MdDone, MdClose } from "react-icons/md";
import { api } from "y/utils/api";
type TodoProps = {
  todo: Todo;
};

const EachTodo = ({ todo }: TodoProps) => {
  const trpc = api.useContext();
  const [isEditing, setIsEditing] = useState(false);
  const { isDone, title, id } = todo;
  const [editTitle, setEditTitle] = useState(title);
  const [isCreated, setIsCreated] = useState(true);
  const CREATED_CLASS = "scale-75 -mb-[calc(48px+12px)] opacity-5";
  const CREATED_DELAY = 0;
  const { mutate: updateTodo, isLoading: updateLoading } =
    api.todo.update.useMutation({
      onSuccess: async () => {
        return await trpc.todo.getAll.invalidate();
      },
    });
  const { mutate: deleteTodo } = api.todo.delete.useMutation({
    onSuccess: async () => {
      return await trpc.todo.getAll.invalidate();
    },
  });
  const taskRef = useRef(null);
  const editRef = useRef<HTMLInputElement>(null);

  const editValidate = () => {
    if (editTitle !== title) {
      updateTodo({ title: editTitle, id });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCreated(false);
    }, CREATED_DELAY);
  }, []);

  useEffect(() => {
    if (isEditing) {
      editRef.current?.focus();
    }
  }, [isEditing]);

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
        className={`w-[250px] rounded bg-gray-800  p-2 text-stone-100  transition duration-100 dark:bg-stone-100 dark:text-gray-800`}
      >
        <div className=" ">
          <div className="flex items-center">
            <span
              onClick={() => {
                if (!updateLoading) {
                  setIsEditing(true);
                }
              }}
              className={`${
                isDone ? "line-through" : ""
              } flex-1 overflow-hidden overflow-ellipsis`}
            >
              {isEditing ? (
                <div className="flex items-center ">
                  <input
                    ref={editRef}
                    onKeyDown={(e) =>
                      e.key === "Enter"
                        ? (editValidate(), setIsEditing(false))
                        : ""
                    }
                    className="flex-1 bg-gray-700 outline-none dark:bg-stone-300"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <div className="flex px-2">
                    <MdDone
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(false);
                        editValidate();
                      }}
                      className="h-5 w-5 cursor-pointer rounded-full p-0.5  hover:bg-gray-700 dark:hover:bg-stone-200"
                    />
                    <MdClose
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(false);
                      }}
                      className="h-5 w-5  cursor-pointer rounded-full p-0.5 hover:bg-gray-700 dark:hover:bg-stone-200"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <span
                    className={`${
                      updateLoading ? "text-gray-500" : ""
                    } flex items-center`}
                  >
                    {title}
                  </span>
                </div>
              )}
            </span>
            {!isEditing && (
              <button onClick={() => deleteTodo(id)}>
                <MdDelete className="text-red-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachTodo;
