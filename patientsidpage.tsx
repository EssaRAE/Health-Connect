"use client"

import { useStore } from "@/lib/store"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Heart } from 'lucide-react'
import { format } from "date-fns"
import Image from "next/image"
import VitalSignsChart from "@/components/vital-signs-chart"

export default function PatientDetailsPage() {
  const { id } = useParams()
  const patients = useStore((state) => state.patients)
  const appointments = useStore((state) => state.appointments)
  
  const patient = patients.find(p => p.id === id)
  const patientAppointments = appointments.filter(a => a.patientId === id)

  if (!patient) {
    return <div>Patient not found</div>
  }

  // Mock medical reports data
  const medicalReports = [
    {
      id: 1,
      type: "X-Ray",
      name: "Chest X-Ray",
      date: "2024-01-15",
      doctor: "Dr. Smith",
      imageUrl: "/placeholder.svg?height=400&width=300",
      findings: "Normal chest radiograph. No acute cardiopulmonary process."
    },
    {
      id: 2,
      type: "MRI",
      name: "Brain MRI",
      date: "2024-02-01",
      doctor: "Dr. Johnson",
      imageUrl: "/placeholder.svg?height=400&width=300",
      findings: "No acute intracranial abnormality."
    }
  ]

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{patient.name}</h1>
          <p className="text-muted-foreground">Patient ID: {patient.id}</p>
        </div>
        <Badge
          variant={
            patient.status === 'critical'
              ? 'destructive'
              : patient.status === 'monitoring'
              ? 'default'
              : 'secondary'
          }
          className="text-base py-1 px-4"
        >
          {patient.status}
        </Badge>
      </div>

      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="portfolio">Medical Portfolio</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="reports">Scans & Reports</TabsTrigger>
          <TabsTrigger value="appointments">Appointment History</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Age</dt>
                    <dd>{patient.age}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
                    <dd>{patient.gender}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Blood Type</dt>
                    <dd>{patient.bloodType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                    <dd>{patient.phone}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid gap-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                    <dd>{patient.emergencyContact.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                    <dd>{patient.emergencyContact.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Relationship</dt>
                    <dd>{patient.emergencyContact.relationship}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Conditions</h4>
                  <div className="flex gap-2 flex-wrap">
                    {patient.conditions.map((condition, i) => (
                      <Badge key={i} variant="secondary">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Allergies</h4>
                  <div className="flex gap-2 flex-wrap">
                    {patient.allergies.map((allergy, i) => (
                      <Badge key={i} variant="destructive">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs History</CardTitle>
              <CardDescription>
                Tracking patient's vital signs over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VitalSignsChart patientId={patient.id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid gap-4 md:grid-cols-2">
            {medicalReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <Badge variant="outline">{report.type}</Badge>
                  </div>
                  <CardDescription>
                    {format(new Date(report.date), 'PPP')} by {report.doctor}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden border">
                    <Image
                      src={report.imageUrl}
                      alt={report.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Findings</h4>
                    <p className="text-sm text-muted-foreground">{report.findings}</p>
                  </div>
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    View Full Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
              <CardDescription>
                Past and upcoming appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {patientAppointments.map((appointment, i) => (
                    <div
                      key={appointment.id}
                      className="flex items-center space-x-4 rounded-lg border p-4"
                    >
                      <Calendar className="h-6 w-6 text-muted-foreground" />
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">
                          {appointment.type} with {appointment.doctor}
                        </p>
                        <div className="text-sm text-muted-foreground">
                          <p>{format(new Date(appointment.date), 'PPP')}</p>
                          <p>{appointment.specialty}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

