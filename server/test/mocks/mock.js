const mock = {};

mock.mockJob1 = {
  company: 'Test company',
  title: 'Test title',
  userId: 'testUser123',
  location: 'USA',
  salary: '10000',
  post_url: 'test.com',
  color: 'yellow',
  todos: []
}


mock.mockJob2 = {
  company: 'Another company',
  title: 'Another title',
  userId: 'testUser123',
  location: 'USA',
  salary: '10000',
  post_url: 'Another.com',
  color: 'yellow',
  todos: []
}


mock.updateFields = {
  company: 'Updated company',
  title: 'Updated title',
  location: 'IND'
}


mock.mockJobUpdate = {
  company: 'Updated company',
  title: 'Updated title',
  userId: 'testUser123',
  location: 'IND',
  salary: '10000',
  post_url: 'test.com',
  color: 'yellow',
  todos: []
}


mock.mockEvent1 = {
  jobId: 'testJobId123',
  userId: 'testUser123',
  name: 'Test Event',
  description: 'Test Event description',
  startDate: '1-1-2001',
  endDate: '2-2-2002',
  startTime: '11:11',
  endTime: '22:22',
  location: 'USA'
}



mock.mockEvent2 = {
  jobId: 'testJobId123',
  userId: 'testUser123',
  name: 'Test Event 1',
  description: 'Test Event 1 description',
  startDate: '1-1-2001',
  endDate: '2-2-2002',
  startTime: '11:11',
  endTime: '22:22',
  location: 'BAN'
}


mock.mockEventUpdate = {
  jobId: 'testJobId123',
  userId: 'testUser123',
  name: 'Updated Event',
  description: 'Updated Event description',
  startDate: '1-3-2001',
  endDate: '5-2-2002',
  startTime: '11:11',
  endTime: '22:22',
  location: 'RUS'
}


mock.eventUpdateFields = {
  name: 'Updated Event',
  description: 'Updated Event description',
  startDate: '1-3-2001',
  endDate: '5-2-2002',
  location: 'RUS'
}


module.exports = mock;