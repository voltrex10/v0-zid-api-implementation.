"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users } from "lucide-react"

export function SalesAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Sales Performance</h2>
        <p className="text-muted-foreground">Track revenue, orders, and sales trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,247.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12.5%
              </span>
              vs yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8.2%
              </span>
              vs yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -2.1%
              </span>
              vs yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$36.70</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +4.1%
              </span>
              vs yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Daily revenue for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">Revenue Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue breakdown by product category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { category: "Electronics", revenue: 18456.78, percentage: 41 },
              { category: "Clothing", revenue: 12345.67, percentage: 27 },
              { category: "Home & Garden", revenue: 8934.56, percentage: 20 },
              { category: "Books", revenue: 3456.78, percentage: 8 },
              { category: "Sports", revenue: 1837.21, percentage: 4 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.category}</span>
                  <span className="font-medium">${item.revenue.toLocaleString()}</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Wireless Headphones", sales: 156, revenue: 7800 },
                { name: "Smart Watch", sales: 134, revenue: 6700 },
                { name: "Laptop Stand", sales: 98, revenue: 2940 },
                { name: "USB-C Cable", sales: 87, revenue: 1305 },
                { name: "Phone Case", sales: 76, revenue: 1520 },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>Geographic distribution of sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { region: "North America", sales: 28456.78, percentage: 63 },
                { region: "Europe", sales: 12345.67, percentage: 27 },
                { region: "Asia Pacific", sales: 3456.78, percentage: 8 },
                { region: "Others", sales: 972.66, percentage: 2 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.region}</span>
                    <span className="font-medium">${item.sales.toLocaleString()}</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Goals</CardTitle>
            <CardDescription>Progress towards monthly targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Revenue Goal</span>
                  <span className="font-medium">$50,000</span>
                </div>
                <Progress value={90} className="h-2" />
                <p className="text-xs text-muted-foreground">$45,231 achieved (90%)</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Orders Goal</span>
                  <span className="font-medium">1,500</span>
                </div>
                <Progress value={83} className="h-2" />
                <p className="text-xs text-muted-foreground">1,247 orders (83%)</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>New Customers Goal</span>
                  <span className="font-medium">200</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-muted-foreground">156 customers (78%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Performance by Time</CardTitle>
          <CardDescription>Hourly sales distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: 24 }, (_, i) => {
              const hour = i
              const sales = Math.floor(Math.random() * 100) + 20
              const isActive = hour >= 9 && hour <= 21
              return (
                <div key={i} className="text-center">
                  <div
                    className={`h-16 w-full rounded mb-1 ${
                      isActive ? "bg-primary" : "bg-muted"
                    } flex items-end justify-center`}
                    style={{ height: `${sales}px` }}
                  >
                    <span className="text-xs text-white font-medium mb-1">{sales}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{hour.toString().padStart(2, "0")}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
