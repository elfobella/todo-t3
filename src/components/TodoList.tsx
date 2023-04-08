import { api } from "y/utils/api";
import EachTodo from "./EachTodo";

const TodoList = () => {
  const { data: todos } = api.todo.getAll.useQuery();

  return (
    <div className="flex flex-col space-y-7">
      <div>
        {todos
          ?.filter((t) => !t.isDone)
          .map((todo) => (
            <EachTodo key={todo.id} todo={todo} />
          ))}
      </div>
      <div>
        <span>Completed ({todos?.filter((t) => t.isDone).length})</span>
        {todos
          ?.filter((t) => t.isDone)
          .map((todo) => (
            <EachTodo key={todo.id} todo={todo} />
          ))}
      </div>
    </div>
  );
};

export default TodoList;
