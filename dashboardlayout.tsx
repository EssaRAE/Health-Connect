import { MainNav } from "@/components/main-nav"

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainNav>{children}</MainNav>
}
