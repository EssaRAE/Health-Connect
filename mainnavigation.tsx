"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Bell, Calendar, FileText, Heart, LayoutDashboard, LogOut, Settings, Upload, User, Users } from 'lucide-react'
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface MainNavProps {
  children: React.ReactNode
}

export function MainNav({ children }: MainNavProps) {
  const router = useRouter()
  const { userType, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const doctorNavItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/patients', icon: Users, label: 'Patients' },
    { href: '/appointments', icon: Calendar, label: 'Appointments' },
    { href: '/analytics', icon: FileText, label: 'Analytics' },
  ]

  const patientNavItems = [
    { href: '/patient/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/patient/appointments', icon: Calendar, label: 'My Appointments' },
    { href: '/patient/health', icon: Heart, label: 'My Health' },
    { href: '/patient/documents', icon: Upload, label: 'My Documents' },
  ]

  const navItems = userType === 'doctor' ? doctorNavItems : patientNavItems

  return (
    <SidebarProvider defaultOpen>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar className="hidden lg:block">
          <SidebarHeader className="border-b px-6 py-3">
            <Link href={userType === 'doctor' ? '/dashboard' : '/patient/dashboard'} className="flex items-center gap-2 font-semibold">
              <Heart className="h-6 w-6" />
              <span>HealthConnect</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={userType === 'doctor' ? '/dashboard/settings' : '/patient/settings'}>
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <SidebarTrigger />
              <div className="ml-auto flex items-center space-x-4">
                <Bell className="h-4 w-4" />
                <User className="h-4 w-4" />
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

