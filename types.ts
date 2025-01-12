export interface PatientVitals {
  heartRate: number
  bloodPressure: number
  glucose: number
}

export interface Patient {
  id: string
  name: string
  age: number
  gender: string
  bloodType: string
  conditions: string[]
  allergies: string[]
  phone: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  vitals: PatientVitals
  status: 'stable' | 'monitoring' | 'critical'
  currentCondition?: {
    description: string
    severity: string
    recommendation: string
    since: string
  }
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  date: string
  time: string
  type: string
  doctor: string
  specialty: string
}

