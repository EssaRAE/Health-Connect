"use client"

import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { format } from "date-fns"
import { useState } from "react"

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const appointments = useStore((state) => state.appointments)

  const selectedDateAppointments = appointments.filter(
    (apt) => apt.date === format(date || new Date(), 'yyyy-MM-dd')
  )

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Select a date to view appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
          <CardDescription>
            {date ? format(date, 'MMMM d, yyyy') : 'No date selected'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedDateAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No appointments scheduled</p>
            ) : (
              selectedDateAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{apt.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {apt.time} - {apt.type} with {apt.doctor}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

