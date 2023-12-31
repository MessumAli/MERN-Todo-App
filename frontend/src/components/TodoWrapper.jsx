import { useState } from "react";
import { ListIcon } from "../assets/icons/ListIcon";
import { ChevronIcon } from "../assets/icons/ChevronIcon";
import { TodoList } from "./TodoList";

export const TodoWrapper = () => {
  const [isTodoListVisible, setTodoListVisible] = useState(false);

  const toggleTodoList = () => {
    setTodoListVisible(!isTodoListVisible);
  };

  return (
    <>
      <div className="bg-orange-400 text-white rounded-md w-2/4 p-3 opacity-70 flex">
        <ListIcon />
        <div className="pl-2 cursor-default">Your Todos</div>
        <ChevronIcon
          className="h-6 w-6 ml-auto cursor-pointer bg-white rounded-md"
          onClick={toggleTodoList}
        />
      </div>
      {isTodoListVisible && <TodoList />}
    </>
  );
}; 
