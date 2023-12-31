import { useState } from "react";
import axios from "axios";
import { PlusIcon } from "../assets/icons/PlusIcon";

export const TodoForm = () => {
  const [todos, setTodos] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://tiny-ruby-dragonfly-robe.cyclic.app/api/v1/todos/create-todos`, {
        text: todos,
      });

      if (response.status === 201) {
        setTodos("");
      } else {
        throw new Error("Failed to create todo");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white flex p-3 rounded-md w-2/4 justify-between gap-x-2 opacity-85"
      >
        <input
          type="text"
          className="outline-none text-zinc-500 grow"
          placeholder="Add new task"
          value={todos}
          onChange={(e) => setTodos(e.target.value)}
        />
        <button className="bg-zinc-300 rounded-md" type="submit">
          <PlusIcon />
        </button>
      </form>
    </>
  );
};
