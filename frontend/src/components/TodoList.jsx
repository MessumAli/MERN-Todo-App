import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdDone } from "react-icons/md";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  // Handle click on the edit icon for a specific todo
  const handleEditClick = (todoId) => {
    setIsEditing((prevIsEditing) => {
      if (prevIsEditing === todoId) {
        setEditTodo("");
        return null;
      } else {
        const todoToEdit = todos.find((todo) => todo._id === todoId);
        setEditTodo(todoToEdit ? todoToEdit.text : "");
        return todoId;
      }
    });
  };

  // Fetch all todos from the server
  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get(`https://tiny-ruby-dragonfly-robe.cyclic.app/api/v1/todos/all-todos`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Handle deletion of a specific todo
  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`https://tiny-ruby-dragonfly-robe.cyclic.app/api/v1/todos/delete-todos/${todoId}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Handle updating the text of a specific todo
  const handleEditTodo = async (todoId) => {
    try {
      if (!editTodo.trim()) {
        setIsEditing(false);
        setEditTodo("");
        return;
      }

      await axios.put(`https://tiny-ruby-dragonfly-robe.cyclic.app/api/v1/todos/update-todos/${todoId}`, {
        text: editTodo,
      });
      fetchTodos();

      setIsEditing(false);
      setEditTodo("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Handle toggling the status (completed/pending) of a specific todo
  const handleCheckboxChange = async (todoId) => {
    try {
      await axios.patch(`https://tiny-ruby-dragonfly-robe.cyclic.app/api/v1/todos/${todoId}/toggle`);
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo status:", error);
    }
  };

  return (
    <>
      {todos.length === 0 ? (
        <div className="mb-3 h-3/4 w-2/4 rounded-md text-zinc-500 text-2xl bg-white opacity-85 flex justify-center items-center">
          No task to display!
        </div>
      ) : (
        <div className="mb-3 h-3/4 w-2/4 rounded-md text-zinc-500 text-lg bg-white opacity-85 overflow-auto">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex flex-col   bg-orange-400 opacity-95 mt-1 mx-1 text-white rounded-md py-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-x-1">
                  {isEditing === todo._id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleEditTodo(todo._id);
                      }}
                      className="bg-white ml-1 flex justify-between items-center gap-x-2 p-1 rounded-md"
                    >
                      <input
                        type="text"
                        className="truncate w-96 text-sm ml-1 rounded-md text-zinc-500 outline-none"
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                      />
                      <button
                        className="bg-orange-400 rounded-md"
                        type="submit"
                      >
                        <MdDone className="text-white" />
                      </button>
                    </form>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        className="ml-2 cursor-pointer outline-none text-orange-400"
                        onChange={() => handleCheckboxChange(todo._id)}
                        checked={todo.status}
                      />
                      <p className="truncate max-w-2xl cursor-default text-sm">
                        {todo.text}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex gap-x-1">
                  <FaRegEdit
                    className="cursor-pointer"
                    onClick={() => handleEditClick(todo._id)}
                  />
                  <MdDelete
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="mr-2 cursor-pointer"
                  />
                </div>
              </div>
              <div className="text-xs flex justify-between mx-2 mt-1">
                <p className="font-medium bg-white text-orange-400 p-1 rounded-md">
                  Status : {todo.status ? "Completed" : "Pending"}
                </p>
                <p className="font-medium bg-white text-orange-400 p-1 rounded-md">
                  Created at : {new Date(todo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
