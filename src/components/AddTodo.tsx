import React, { useState } from "react";
import { api } from "y/utils/api";

const AddTodo = () => {
  const trpc = api.useContext();
  const { mutate: addTodo } = api.todo.create.useMutation({
    onSuccess: async () => {
      return await trpc.todo.getAll.invalidate();
    },
  });
  const [inputs, setInputs] = useState("");

  return (
    <div className="flex space-x-2">
      <input
        onKeyDown={(e) =>
          e.key === "Enter"
            ? (setInputs(""), addTodo({ title: inputs, isDone: false }))
            : ""
        }
        type="text"
        value={inputs}
        onChange={(e) => setInputs(e.target.value)}
        placeholder="Type"
        className="border-b-2 border-gray-800 bg-transparent p-1 outline-none dark:border-stone-100"
      />
      <button
        onClick={() => {
          setInputs("");
          addTodo({ title: inputs, isDone: false });
        }}
        className="rounded bg-gray-800 px-4 py-1 text-stone-100 dark:bg-stone-100 dark:text-gray-800"
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
