"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data - in a real app, this would come from your API
const generateVitalsData = (patientId: string) => {
  const data = []
  const now = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      heartRate: Math.floor(Math.random() * 20 + 70),
      bloodPressure: Math.floor(Math.random() * 20 + 110),
      glucose: Math.floor(Math.random() * 30 + 80),
    })
  }
  
  return data
}

export default function VitalSignsChart({ patientId }: { patientId: string }) {
  const data = generateVitalsData(patientId)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{data[data.length - 1].heartRate}</div>
            <p className="text-xs text-muted-foreground">Heart Rate (bpm)</p>
            <ChartContainer
              config={{
                heartRate: {
                  label: "Heart Rate",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[100px] mt-4"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    strokeWidth={2}
                    dot={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{data[data.length - 1].bloodPressure}</div>
            <p className="text-xs text-muted-foreground">Blood Pressure (mmHg)</p>
            <ChartContainer
              config={{
                bloodPressure: {
                  label: "Blood Pressure",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[100px] mt-4"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="bloodPressure"
                    strokeWidth={2}
                    dot={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{data[data.length - 1].glucose}</div>
            <p className="text-xs text-muted-foreground">Blood Glucose (mg/dL)</p>
            <ChartContainer
              config={{
                glucose: {
                  label: "Glucose",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[100px] mt-4"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="glucose"
                    strokeWidth={2}
                    dot={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <ChartContainer
            config={{
              heartRate: {
                label: "Heart Rate",
                color: "hsl(var(--chart-1))",
              },
              bloodPressure: {
                label: "Blood Pressure",
                color: "hsl(var(--chart-2))",
              },
              glucose: {
                label: "Glucose",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Line
                  type="monotone"
                  dataKey="heartRate"
                  strokeWidth={2}
                  dot={true}
                />
                <Line
                  type="monotone"
                  dataKey="bloodPressure"
                  strokeWidth={2}
                  dot={true}
                />
                <Line
                  type="monotone"
                  dataKey="glucose"
                  strokeWidth={2}
                  dot={true}
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

