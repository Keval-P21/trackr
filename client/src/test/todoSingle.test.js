import TodoSingle from "../components/todos/TodoSingle";
import { render, screen } from '@testing-library/react';
import { toBeDisabled, toBeCalled } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 

const mockTask = {
  content: "test",
  active: true,
  completed: false,
  _id: 'testID123456',
}


it('should show a delete button when passed a deleteTodo', () => {

  const deleteToDo = jest.fn()

  render(<TodoSingle task={mockTask} deleteTodo={deleteToDo}/>);

  const deleteButton = screen.getByRole('button');
  expect(deleteButton).toBeDefined();
  expect(deleteButton).toHaveClass('btn-bin');
})



it('should display task content with proper class', () => {
  const deleteToDo = jest.fn()

  render(<TodoSingle task={mockTask} deleteTodo={deleteToDo}/>);

  const task = screen.getByRole('task');
  expect(task).toContainHTML('- ' + mockTask.content);
  expect(task).toHaveClass('todo-item');
})