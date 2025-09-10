"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, TrendingUp, UserPlus, UserMinus, Calendar, MapPin } from "lucide-react"

const customerMetrics = [
  {
    title: "Total Customers",
    value: "2,847",
    change: "+23%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "New Customers",
    value: "156",
    change: "+12%",
    icon: UserPlus,
    color: "text-green-600",
  },
  {
    title: "Customer Retention",
    value: "85%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    title: "Churn Rate",
    value: "3.2%",
    change: "-1.2%",
    icon: UserMinus,
    color: "text-red-600",
  },
]

const topCustomers = [
  { name: "Ahmed Al-Rashid", orders: 45, revenue: "$12,450", location: "Riyadh" },
  { name: "Fatima Hassan", orders: 38, revenue: "$9,870", location: "Jeddah" },
  { name: "Omar Abdullah", orders: 32, revenue: "$8,650", location: "Dammam" },
  { name: "Aisha Mohammed", orders: 28, revenue: "$7,230", location: "Mecca" },
  { name: "Khalid Al-Otaibi", orders: 25, revenue: "$6,890", location: "Medina" },
]

const customerSegments = [
  { name: "VIP Customers", count: 234, percentage: 8.2, color: "bg-purple-500" },
  { name: "Regular Customers", count: 1456, percentage: 51.1, color: "bg-blue-500" },
  { name: "New Customers", count: 892, percentage: 31.3, color: "bg-green-500" },
  { name: "Inactive Customers", count: 265, percentage: 9.3, color: "bg-gray-400" },
]

export function CustomerAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Analytics</h2>
          <p className="text-muted-foreground">Analyze customer behavior and engagement</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {customerMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {metric.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Highest value customers by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {customer.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{customer.revenue}</p>
                    <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Customer distribution by engagement level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSegments.map((segment) => (
                <div key={segment.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{segment.name}</span>
                    <span className="text-muted-foreground">
                      {segment.count} ({segment.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className={`h-2 rounded-full ${segment.color}`} style={{ width: `${segment.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Acquisition Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Acquisition Trends</CardTitle>
          <CardDescription>New customer registration over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">This Month</span>
              </div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-muted-foreground">+12% from last month</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">This Quarter</span>
              </div>
              <p className="text-2xl font-bold">487</p>
              <p className="text-sm text-muted-foreground">+18% from last quarter</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">This Year</span>
              </div>
              <p className="text-2xl font-bold">1,923</p>
              <p className="text-sm text-muted-foreground">+25% from last year</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Lifetime Value */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Lifetime Value</CardTitle>
          <CardDescription>Average customer value and engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">$2,450</p>
              <p className="text-sm text-muted-foreground">Average CLV</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">4.2</p>
              <p className="text-sm text-muted-foreground">Avg Orders per Customer</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">$580</p>
              <p className="text-sm text-muted-foreground">Average Order Value</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">18 months</p>
              <p className="text-sm text-muted-foreground">Avg Customer Lifespan</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
