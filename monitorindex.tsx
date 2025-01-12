'use server'

interface PatientVitals {
  heartRate: number
  bloodPressure: number
  glucose: number
}

interface Analysis {
  isCritical: boolean
  severity: 'normal' | 'concerning' | 'critical'
  recommendation: string
}

export async function analyzePatientCondition(vitals: PatientVitals): Promise<Analysis> {
  // Using medical thresholds for vital signs
  const isHeartRateCritical = vitals.heartRate > 100 || vitals.heartRate < 60
  const isBloodPressureCritical = vitals.bloodPressure > 140 || vitals.bloodPressure < 90
  const isGlucoseCritical = vitals.glucose > 180 || vitals.glucose < 70

  const isCritical = isHeartRateCritical || isBloodPressureCritical || isGlucoseCritical

  let severity: 'normal' | 'concerning' | 'critical' = 'normal'
  let recommendation = 'Vital signs are within normal range. Continue monitoring.'

  if (isCritical) {
    severity = 'critical'
    const issues = []
    
    if (isHeartRateCritical) {
      issues.push('abnormal heart rate')
    }
    if (isBloodPressureCritical) {
      issues.push('concerning blood pressure')
    }
    if (isGlucoseCritical) {
      issues.push('irregular glucose levels')
    }

    recommendation = `Patient shows ${issues.join(', ')}. Immediate medical attention recommended.`
  }

  return {
    isCritical,
    severity,
    recommendation
  }
}

