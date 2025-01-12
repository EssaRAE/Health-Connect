"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

export default function PatientsPage() {
  const patients = useStore((state) => state.patients)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patients</h1>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map((patient) => (
            <Link href={`/app/patients/${patient.id}`} key={patient.id}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-base font-medium">
                    {patient.name}
                  </CardTitle>
                  <Badge
                    variant={
                      patient.status === 'critical'
                        ? 'destructive'
                        : patient.status === 'monitoring'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {patient.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Age</dt>
                      <dd>{patient.age}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Gender</dt>
                      <dd>{patient.gender}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Blood Type</dt>
                      <dd>{patient.bloodType}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Conditions</dt>
                      <dd>{patient.conditions.length}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

