import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, User, RefreshCw } from "lucide-react"

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders, products, customers..." className="pl-10 w-80" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="outline" className="gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          API Connected
        </Badge>

        <Button variant="ghost" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
