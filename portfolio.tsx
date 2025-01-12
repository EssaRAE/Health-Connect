import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PatientPortfolio() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                <dd>John Doe</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Age</dt>
                <dd>45</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Blood Type</dt>
                <dd>A+</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
                <dd>Male</dd>
              </div>
            </dl>
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
                <Badge>Hypertension</Badge>
                <Badge>Type 2 Diabetes</Badge>
                <Badge variant="secondary">Asthma (Controlled)</Badge>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Allergies</h4>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="destructive">Penicillin</Badge>
                <Badge variant="destructive">Peanuts</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Tests</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  date: "2023-12-28",
                  type: "Blood Work",
                  result: "Normal",
                },
                {
                  date: "2023-12-15",
                  type: "ECG",
                  result: "Normal Sinus Rhythm",
                },
                {
                  date: "2023-12-01",
                  type: "HbA1c",
                  result: "6.2%",
                },
              ].map((test, i) => (
                <div key={i} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{test.type}</p>
                    <p className="text-sm text-muted-foreground">{test.date}</p>
                  </div>
                  <div className="ml-auto font-medium">{test.result}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}

