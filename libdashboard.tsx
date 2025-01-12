"use client"

import { Bell, Calendar, ChevronDown, Heart, LineChart, Plus, Search, User, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import VitalSigns from "./vital-signs"
import PatientPortfolio from "./patient-portfolio"
import Appointments from "./appointments"
import Analytics from "./analytics"
import { AddPatientDialog } from "@/components/add-patient-dialog"
import { CriticalAlert } from "@/components/critical-alert"
import { usePatientMonitoring } from "@/hooks/use-patient-monitoring"

// Simulated patient data for demo
const mockPatient = {
  id: "1",
  name: "John Doe",
  vitals: {
    heartRate: 120,
    bloodPressure: 160,
    glucose: 200
  }
}

export default function Dashboard() {
  const { showAlert, criticalPatient, handleCloseAlert } = usePatientMonitoring(mockPatient)

  return (
    <div className="flex min-h-screen flex-col">
      {criticalPatient && (
        <CriticalAlert
          patient={criticalPatient}
          isOpen={showAlert}
          onClose={handleCloseAlert}
        />
      )}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="#">
              <Heart className="h-6 w-6" />
              <span className="font-bold">HealthConnect</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-foreground/80" href="#">Dashboard</a>
              <a className="transition-colors hover:text-foreground/80" href="#">Patients</a>
              <a className="transition-colors hover:text-foreground/80" href="#">Calendar</a>
              <a className="transition-colors hover:text-foreground/80" href="#">Analytics</a>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <AddPatientDialog />
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk Patients</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Requires immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 pending confirmations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Monitoring</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">Real-time vital tracking</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Patient Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Tabs defaultValue="vitals" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
                    <TabsTrigger value="portfolio">Medical Portfolio</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>
                  <TabsContent value="vitals" className="space-y-4">
                    <VitalSigns />
                  </TabsContent>
                  <TabsContent value="portfolio" className="space-y-4">
                    <PatientPortfolio />
                  </TabsContent>
                  <TabsContent value="appointments" className="space-y-4">
                    <Appointments />
                  </TabsContent>
                  <TabsContent value="analytics" className="space-y-4">
                    <Analytics />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>High Risk Patients</CardTitle>
                <CardDescription>
                  Patients requiring immediate attention based on vital signs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Patient #{i}</p>
                        <p className="text-sm text-muted-foreground">
                          Abnormal heart rate detected
                        </p>
                      </div>
                      <div className="ml-auto font-medium">Critical</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

