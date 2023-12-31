import express from 'express';
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
  toggleTodoStatus,
} from '../controllers/todoControllers.js';

const router = express.Router();

// Create a new Todo
router.post('/create-todos', createTodo);

// Update a Todo
router.put('/update-todos/:id', updateTodo);

// Delete a Todo
router.delete('/delete-todos/:id', deleteTodo);

// Get all Todos
router.get('/all-todos', getAllTodos);

// Toggle the status of a Todo
router.patch('/:id/toggle', toggleTodoStatus);

export default router;
