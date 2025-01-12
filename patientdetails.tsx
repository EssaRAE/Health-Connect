import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { formatDistanceToNow } from "date-fns"

export function PatientDetails() {
  const selectedPatientId = useStore((state) => state.selectedPatientId)
  const setSelectedPatientId = useStore((state) => state.setSelectedPatientId)
  const patients = useStore((state) => state.patients)
  
  const patient = patients.find(p => p.id === selectedPatientId)
  
  if (!patient) return null

  const isHighRisk = patient.status === 'critical'

  return (
    <Dialog open={!!selectedPatientId} onOpenChange={() => setSelectedPatientId(null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
          <DialogDescription>
            Detailed medical information and current status
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Current Status</CardTitle>
                  <Badge variant={isHighRisk ? "destructive" : "secondary"}>
                    {patient.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              {patient.currentCondition && (
                <CardContent className="space-y-2">
                  <p>{patient.currentCondition.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Since:</span>
                    <span>{formatDistanceToNow(new Date(patient.currentCondition.since), { addSuffix: true })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Severity:</span>
                    <span>{patient.currentCondition.severity}</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Recommendation: </span>
                    {patient.currentCondition.recommendation}
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vital Signs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium">Heart Rate</p>
                    <p className={`text-2xl font-bold ${patient.vitals.heartRate > 100 ? 'text-destructive' : ''}`}>
                      {patient.vitals.heartRate} <span className="text-sm font-normal">bpm</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Blood Pressure</p>
                    <p className={`text-2xl font-bold ${patient.vitals.bloodPressure > 140 ? 'text-destructive' : ''}`}>
                      {patient.vitals.bloodPressure} <span className="text-sm font-normal">mmHg</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Blood Glucose</p>
                    <p className={`text-2xl font-bold ${patient.vitals.glucose > 180 ? 'text-destructive' : ''}`}>
                      {patient.vitals.glucose} <span className="text-sm font-normal">mg/dL</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

