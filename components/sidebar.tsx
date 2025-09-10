import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, ShoppingCart, Package, Users, BarChart3, Settings, Webhook, MapPin } from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: ShoppingCart, label: "Orders", href: "/orders" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: MapPin, label: "Inventory", href: "/inventory" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: Webhook, label: "Webhooks", href: "/webhooks" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  return (
    <div className="w-64 bg-card border-r border-border">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground">Voltrex ERP</h1>
        <p className="text-sm text-muted-foreground">Zid Integration Platform</p>
      </div>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <nav className="px-4 space-y-2">
          {sidebarItems.map((item) => (
            <Button key={item.href} variant="ghost" className="w-full justify-start gap-3 h-10">
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
