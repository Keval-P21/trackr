export interface Event {
  _id?: string,
  jobId: string,
  userId: string,
  name: string,
  description?: string,
  startDate: string,
  endDate?: string,
  startTime: string,
  endTime?: string,
  location?: string
}

export interface EventItemProps{ 
  singleEvent:Event,
   getUserEvents : Function,
   setEvents : Function
  }