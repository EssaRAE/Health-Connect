'use server'

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function analyzePatientCondition(vitals: {
  heartRate: number
  bloodPressure: number
  glucose: number
}) {
  try {
    const prompt = `
      Analyze these patient vitals:
      Heart Rate: ${vitals.heartRate} bpm
      Blood Pressure: ${vitals.bloodPressure} mmHg
      Blood Glucose: ${vitals.glucose} mg/dL

      Determine if this is a critical condition requiring immediate attention.
      Return in JSON format with fields:
      - isCritical (boolean)
      - severity (string: 'normal', 'concerning', 'critical')
      - recommendation (string)
    `

    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt,
    })

    return JSON.parse(text)
  } catch (error) {
    // For demo purposes, return mock analysis when API key is not available
    console.warn("Using mock analysis due to API error:", error)
    
    const isCritical = vitals.heartRate > 100 || 
                      vitals.bloodPressure > 140 || 
                      vitals.glucose > 180

    return {
      isCritical,
      severity: isCritical ? "critical" : "normal",
      recommendation: isCritical 
        ? "Patient shows concerning vital signs. Immediate medical attention recommended."
        : "Vital signs are within normal range. Continue monitoring."
    }
  }
}

