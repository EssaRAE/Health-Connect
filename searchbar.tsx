import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useStore } from "@/lib/store"

export function SearchBar() {
  const setSearchQuery = useStore((state) => state.setSearchQuery)

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search patients by name..."
        className="pl-8"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

