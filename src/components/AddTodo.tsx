import React, { useState } from "react";
import { api } from "y/utils/api";

const AddTodo = () => {
  const trpc = api.useContext();
  const { mutate: addTodo, isLoading } = api.todo.create.useMutation({
    onSuccess: async () => {
      return await trpc.todo.getAll.invalidate();
    },
  });
  const [inputs, setInputs] = useState("");

  return (
    <div className="flex w-[280px] space-x-2">
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
        className="flex-1 border-b-2 border-gray-800 bg-transparent p-1 outline-none dark:border-stone-100"
      />
      <button
        disabled={isLoading || !inputs}
        onClick={() => {
          setInputs("");
          addTodo({ title: inputs, isDone: false });
        }}
        className={`rounded ${
          isLoading ? "bg-gray-600" : ""
        } bg-gray-800 px-4 py-1 text-stone-100 outline-none dark:bg-stone-100 dark:text-gray-800`}
      >
        {isLoading ? "Adding" : "Add"}
      </button>
    </div>
  );
};

export default AddTodo;
