"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const healthTrends = [
  { month: "Jan", patients: 100, risk: 10 },
  { month: "Feb", patients: 120, risk: 15 },
  { month: "Mar", patients: 150, risk: 18 },
  { month: "Apr", patients: 180, risk: 22 },
  { month: "May", patients: 220, risk: 25 },
  { month: "Jun", patients: 250, risk: 30 },
]

const conditionDistribution = [
  { condition: "Hypertension", count: 45 },
  { condition: "Diabetes", count: 35 },
  { condition: "Asthma", count: 28 },
  { condition: "Heart Disease", count: 20 },
  { condition: "Arthritis", count: 15 },
]

export default function Analytics() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Patient Health Trends</CardTitle>
          <CardDescription>6-month overview</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              patients: {
                label: "Total Patients",
                color: "hsl(var(--chart-1))",
              },
              risk: {
                label: "High Risk",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthTrends}>
                <Line
                  type="monotone"
                  dataKey="patients"
                  strokeWidth={2}
                  activeDot={{
                    r: 6,
                    style: { fill: "var(--color-patients)", opacity: 0.8 },
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="risk"
                  strokeWidth={2}
                  activeDot={{
                    r: 6,
                    style: { fill: "var(--color-risk)", opacity: 0.8 },
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Condition Distribution</CardTitle>
          <CardDescription>Most common conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Patients",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conditionDistribution}>
                <Bar
                  dataKey="count"
                  style={{
                    fill: "var(--color-count)",
                    opacity: 0.9,
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

