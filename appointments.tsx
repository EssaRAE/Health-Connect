import { Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export default function Appointments() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  date: "2024-01-03",
                  time: "09:00 AM",
                  type: "Follow-up",
                  doctor: "Dr. Smith",
                  specialty: "Cardiology",
                },
                {
                  date: "2024-01-05",
                  time: "02:30 PM",
                  type: "Consultation",
                  doctor: "Dr. Johnson",
                  specialty: "Endocrinology",
                },
                {
                  date: "2024-01-07",
                  time: "11:00 AM",
                  type: "Check-up",
                  doctor: "Dr. Williams",
                  specialty: "General Practice",
                },
              ].map((appointment, i) => (
                <div key={i} className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {appointment.type} with {appointment.doctor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Reschedule
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Check-ups</CardTitle>
            <CardDescription>Based on medical history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "Annual Physical",
                  due: "Due in 2 months",
                  priority: "Regular",
                },
                {
                  type: "Eye Examination",
                  due: "Overdue by 1 month",
                  priority: "High",
                },
                {
                  type: "Dental Check-up",
                  due: "Due next week",
                  priority: "Medium",
                },
              ].map((checkup, i) => (
                <div key={i} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{checkup.type}</p>
                    <p className="text-sm text-muted-foreground">{checkup.due}</p>
                  </div>
                  <Button variant="secondary" size="sm" className="ml-auto">
                    Schedule
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}

