"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import VitalSignsChart from "@/components/vital-signs-chart"

export default function AnalyticsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const patients = useStore((state) => state.patients)

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patient..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {searchQuery ? (
          filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <Card key={patient.id}>
                <CardHeader>
                  <CardTitle>{patient.name}</CardTitle>
                  <CardDescription>
                    Patient ID: {patient.id} • Age: {patient.age} • Gender: {patient.gender}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VitalSignsChart patientId={patient.id} />
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No patients found matching "{searchQuery}"
              </CardContent>
            </Card>
          )
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Search for a patient to view their vital signs analytics
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

