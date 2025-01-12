"use client"

import { useEffect } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useStore } from "@/lib/store"

interface CriticalAlertProps {
  patient: {
    id: string
    name: string
    condition: {
      severity: string
      recommendation: string
    }
  }
  isOpen: boolean
  onClose: () => void
}

export function CriticalAlert({ patient, isOpen, onClose }: CriticalAlertProps) {
  const addNotification = useStore((state) => state.addNotification)
  const markAlertShown = useStore((state) => state.markAlertShown)
  const setSelectedPatientId = useStore((state) => state.setSelectedPatientId)

  const handleViewDetails = () => {
    setSelectedPatientId(patient.id)
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      addNotification({
        title: "Critical Patient Alert",
        message: `Patient ${patient.name} requires immediate attention. ${patient.condition.recommendation}`,
        type: "alert",
        patientId: patient.id
      })
      markAlertShown(patient.id)
    }
  }, [isOpen, patient, addNotification, markAlertShown])

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Critical Patient Alert
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-2">
              <span className="block font-medium">
                Patient {patient.name} requires immediate attention
              </span>
              <span className="block">
                Severity: {patient.condition.severity}
              </span>
              <span className="block">
                Recommendation: {patient.condition.recommendation}
              </span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Dismiss</AlertDialogCancel>
          <AlertDialogAction onClick={handleViewDetails}>
            View Details
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

