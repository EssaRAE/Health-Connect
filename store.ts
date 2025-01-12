import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Patient, Appointment } from './types'

interface Notification {
  id: string
  title: string
  message: string
  type: 'alert' | 'info'
  read: boolean
  timestamp: number
  patientId?: string
}

interface StoreState {
  patients: Patient[]
  appointments: Appointment[]
  notifications: Notification[]
  searchQuery: string
  showSuccessAnimation: boolean
  shownAlerts: string[]
  selectedPatientId: string | null
  addPatient: (patient: Patient) => void
  addAppointment: (appointment: Appointment) => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markNotificationAsRead: (id: string) => void
  setSearchQuery: (query: string) => void
  setShowSuccessAnimation: (show: boolean) => void
  markAlertShown: (patientId: string) => void
  hasAlertBeenShown: (patientId: string) => boolean
  setSelectedPatientId: (id: string | null) => void
}

const names = [
  "Emma Thompson", "James Wilson", "Sarah Martinez", "Michael Chen", 
  "Rachel Anderson", "David Kim", "Lisa Patel", "John Murphy",
  "Maria Garcia", "Robert Taylor"
]

const conditions = [
  "Hypertension", "Type 2 Diabetes", "Asthma", "Arthritis",
  "Heart Disease", "Chronic Migraine", "Anxiety Disorder"
]

const allergies = [
  "Penicillin", "Peanuts", "Latex", "Dust", "Shellfish",
  "Dairy", "Pollen", "Bee Stings"
]

function generateVitals(isHighRisk: boolean): PatientVitals {
  return {
    heartRate: isHighRisk ? Math.floor(Math.random() * 40) + 120 : Math.floor(Math.random() * 20) + 70,
    bloodPressure: isHighRisk ? Math.floor(Math.random() * 30) + 150 : Math.floor(Math.random() * 20) + 110,
    glucose: isHighRisk ? Math.floor(Math.random() * 100) + 200 : Math.floor(Math.random() * 30) + 80
  }
}

// Mock data for patients with more variation
const mockPatients: Patient[] = names.map((name, i) => {
  const isHighRisk = i < 3 // First 3 patients are high risk
  const isMonitoring = i >= 3 && i < 6 // Next 3 are under monitoring
  
  return {
    id: `pat${i + 1}`,
    name,
    age: Math.floor(Math.random() * 50) + 25,
    gender: i % 2 === 0 ? 'male' : 'female',
    bloodType: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'][i % 8],
    conditions: Array(Math.floor(Math.random() * 2) + 1)
      .fill(0)
      .map(() => conditions[Math.floor(Math.random() * conditions.length)]),
    allergies: Array(Math.floor(Math.random() * 2))
      .fill(0)
      .map(() => allergies[Math.floor(Math.random() * allergies.length)]),
    phone: `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    emergencyContact: {
      name: `Emergency Contact ${i + 1}`,
      phone: `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      relationship: ['Spouse', 'Parent', 'Sibling', 'Child'][Math.floor(Math.random() * 4)],
    },
    vitals: generateVitals(isHighRisk),
    status: isHighRisk ? 'critical' : (isMonitoring ? 'monitoring' : 'stable'),
    ...(isHighRisk && {
      currentCondition: {
        description: "Patient showing concerning vital signs with multiple risk factors.",
        severity: "High",
        recommendation: "Immediate medical evaluation required.",
        since: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString()
      }
    })
  }
})

// Generate appointments ensuring no more than 2 per day
const mockAppointments: Appointment[] = mockPatients.map((patient, i) => {
  const baseDate = new Date()
  const dayOffset = Math.floor(i / 2) // Two appointments per day
  const timeSlot = i % 2 // Morning or afternoon
  
  baseDate.setDate(baseDate.getDate() + dayOffset)
  
  return {
    id: `apt-${patient.id}`,
    patientId: patient.id,
    patientName: patient.name,
    date: baseDate.toISOString().split('T')[0],
    time: timeSlot === 0 ? '09:00 AM' : '02:00 PM',
    type: patient.status === 'critical' ? 'Urgent Care' : 'Check-up',
    doctor: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Davis'][Math.floor(Math.random() * 5)]}`,
    specialty: ['Cardiology', 'Internal Medicine', 'General Practice', 'Endocrinology'][Math.floor(Math.random() * 4)]
  }
})

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      patients: mockPatients,
      appointments: mockAppointments,
      notifications: [],
      searchQuery: '',
      showSuccessAnimation: false,
      shownAlerts: [],
      selectedPatientId: null,
      addPatient: (patient) =>
        set((state) => ({
          patients: [...state.patients, patient],
          showSuccessAnimation: true
        })),
      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [...state.appointments, appointment]
        })),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              id: crypto.randomUUID(),
              timestamp: Date.now(),
              read: false,
              ...notification
            },
            ...state.notifications
          ]
        })),
      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          )
        })),
      setSearchQuery: (query) =>
        set(() => ({
          searchQuery: query
        })),
      setShowSuccessAnimation: (show) =>
        set(() => ({
          showSuccessAnimation: show
        })),
      markAlertShown: (patientId: string) =>
        set((state) => ({
          shownAlerts: [...state.shownAlerts, patientId]
        })),
      hasAlertBeenShown: (patientId: string) => {
        return get().shownAlerts.includes(patientId)
      },
      setSelectedPatientId: (id) =>
        set(() => ({
          selectedPatientId: id
        }))
    }),
    {
      name: 'health-connect-storage'
    }
  )
)

