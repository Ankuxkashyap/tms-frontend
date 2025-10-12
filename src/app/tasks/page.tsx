"use client"

import React from 'react'
import {Calendar} from "@/components/ui/calendar"

const Tasks = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  console.log(date);
  return (
    <div>
      <h1>Tasks</h1>
      <Calendar 
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border p-3 w-fit "
      />
    </div>
  )
}

export default Tasks