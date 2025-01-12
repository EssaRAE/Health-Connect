"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "00:00", heartRate: 72, bloodPressure: 120, glucose: 95 },
  { time: "04:00", heartRate: 68, bloodPressure: 118, glucose: 92 },
  { time: "08:00", heartRate: 70, bloodPressure: 122, glucose: 98 },
  { time: "12:00", heartRate: 75, bloodPressure: 125, glucose: 105 },
  { time: "16:00", heartRate: 72, bloodPressure: 121, glucose: 99 },
  { time: "20:00", heartRate: 70, bloodPressure: 119, glucose: 97 },
]

export default function VitalSigns() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Heart Rate</CardTitle>
          <CardDescription>Beats per minute</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              heartRate: {
                label: "Heart Rate",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="heartRate"
                  strokeWidth={2}
                  activeDot={{
                    r: 6,
                    style: { fill: "var(--color-heartRate)", opacity: 0.8 },
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
          <CardTitle>Blood Pressure</CardTitle>
          <CardDescription>Systolic (mmHg)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              bloodPressure: {
                label: "Blood Pressure",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="bloodPressure"
                  strokeWidth={2}
                  activeDot={{
                    r: 6,
                    style: { fill: "var(--color-bloodPressure)", opacity: 0.8 },
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
          <CardTitle>Blood Glucose</CardTitle>
          <CardDescription>mg/dL</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              glucose: {
                label: "Glucose",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="glucose"
                  strokeWidth={2}
                  activeDot={{
                    r: 6,
                    style: { fill: "var(--color-glucose)", opacity: 0.8 },
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

