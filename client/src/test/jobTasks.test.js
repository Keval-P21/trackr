import JobTasks from "../components/todos/JobTasks.";
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

const mockData = {
  title: "title",
  company: "company",
  todos: [{content: 'test todo', active: true}],
  _id: 'testID123456',
}



it('should show job information', () => {

  const result = render(
    <Router>
      <JobTasks data={mockData} />
    </Router>
  );

  const jobInfo = result.container.querySelector('h3');

  expect(jobInfo.innerHTML).toBe(mockData.title + ' - ' + mockData.company + `<a class=\"btn margin-left\" href=\"/job/${mockData._id}\">Details</a>`);
})




it('should not show any child components if no data is passed', () => {

  const result = render(
    <Router>
      <JobTasks />
    </Router>
  );

  expect(result.container.innerHTML).toBe('<div>No Tasks Yet</div>');
})

