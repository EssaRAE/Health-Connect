import { useState, useCallback, useEffect } from 'react'
import { analyzePatientCondition } from "@/lib/monitor/index"
import { useStore } from "@/lib/store"

export function usePatientMonitoring(initialPatient: any) {
  const [state, setState] = useState({
    showAlert: false,
    criticalPatient: null as any
  })
  
  const hasAlertBeenShown = useStore((state) => state.hasAlertBeenShown)
  
  const handleCloseAlert = useCallback(() => {
    setState(prev => ({ ...prev, showAlert: false }))
  }, [])

  useEffect(() => {
    let mounted = true

    const monitorVitals = async () => {
      try {
        if (!initialPatient?.vitals) {
          console.warn("No vitals data available for monitoring");
          return;
        }
        const analysis = await analyzePatientCondition(initialPatient.vitals)
        if (mounted && analysis.isCritical && !hasAlertBeenShown(initialPatient.id)) {
          setState({
            showAlert: true,
            criticalPatient: {
              ...initialPatient,
              condition: analysis
            }
          })
        }
      } catch (error) {
        console.error("Error in patient monitoring:", error instanceof Error ? error.message : "Unknown error");
      }
    }

    const interval = setInterval(monitorVitals, 30000)
    monitorVitals() // Initial check

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [initialPatient, hasAlertBeenShown])

  return {
    showAlert: state.showAlert,
    criticalPatient: state.criticalPatient,
    handleCloseAlert
  }
}

