import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, Users, DollarSign, TrendingUp, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Total Orders",
    value: "1,234",
    change: "+12%",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Products",
    value: "856",
    change: "+3%",
    icon: Package,
    color: "text-green-600",
  },
  {
    title: "Customers",
    value: "2,341",
    change: "+8%",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "+15%",
    icon: DollarSign,
    color: "text-orange-600",
  },
]

const recentOrders = [
  { id: "#12345", customer: "Ahmed Ali", status: "completed", amount: "$125.00" },
  { id: "#12346", customer: "Sara Mohammed", status: "processing", amount: "$89.50" },
  { id: "#12347", customer: "Omar Hassan", status: "pending", amount: "$234.75" },
  { id: "#12348", customer: "Fatima Al-Zahra", status: "shipped", amount: "$156.25" },
]

const apiEndpoints = [
  { name: "Orders API", status: "active", calls: "1,234" },
  { name: "Products API", status: "active", calls: "856" },
  { name: "Customers API", status: "active", calls: "432" },
  { name: "Inventory API", status: "active", calls: "189" },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Zid ERP management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your Zid store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "processing"
                            ? "secondary"
                            : order.status === "shipped"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                    <span className="font-medium">{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* API Status */}
        <Card>
          <CardHeader>
            <CardTitle>API Status</CardTitle>
            <CardDescription>Zid API endpoints and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiEndpoints.map((endpoint) => (
                <div key={endpoint.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">{endpoint.name}</p>
                      <p className="text-sm text-muted-foreground">{endpoint.calls} calls today</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {endpoint.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              API Documentation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Package className="h-5 w-5" />
              Add Product
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <ShoppingCart className="h-5 w-5" />
              Create Order
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Users className="h-5 w-5" />
              Add Customer
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <TrendingUp className="h-5 w-5" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
