"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Stethoscope } from 'lucide-react'
import { useAuthStore } from "@/lib/auth-store"

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore((state) => state.login)

  const handleDoctorLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate authentication - in real app, validate credentials
    login('doctor', 'doc_123')
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Heart className="h-12 w-12 mb-4" />
          <h1 className="text-2xl font-bold">HealthConnect</h1>
          <p className="text-muted-foreground">
            Healthcare Management Platform
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Login to access your healthcare portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="doctor" className="space-y-4">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="doctor" className="space-x-2">
                  <Stethoscope className="h-4 w-4" />
                  <span>Doctor</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="doctor">
                <form onSubmit={handleDoctorLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-email">Email</Label>
                    <Input
                      id="doctor-email"
                      type="email"
                      placeholder="doctor@hospital.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-password">Password</Label>
                    <Input
                      id="doctor-password"
                      type="password"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login as Doctor"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

