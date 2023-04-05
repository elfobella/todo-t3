import { Todo } from "@prisma/client";
import { reverse } from "dns";
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
  const { mutate: updateTodo, isLoading } = api.todo.update.useMutation({
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
        className={`w-[250px] rounded bg-gray-800 p-2 text-stone-100  transition duration-100 dark:bg-stone-100 dark:text-gray-800`}
      >
        <div className=" ">
          <div
            onMouseLeave={() => setIsEditing(false)}
            className="flex items-center"
          >
            <span
              onClick={() => {
                setIsEditing(true);
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
                        ? (updateTodo({ title: editTitle, id }),
                          setIsEditing(false))
                        : ""
                    }
                    className="bg-stone-300"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <div className="flex">
                    <MdDone
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(false);
                        updateTodo({ title: editTitle, id });
                      }}
                      className="cursor-pointer rounded-full p-[1px] hover:bg-stone-200"
                    />
                    <MdClose
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(false);
                      }}
                      className="cursor-pointer rounded-full p-[1px] hover:bg-stone-200"
                    />
                  </div>
                </div>
              ) : (
                title
              )}
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
