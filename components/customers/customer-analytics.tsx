"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, DollarSign, ShoppingCart, Calendar, Target, Award, Clock } from "lucide-react"

export function CustomerAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Customer Analytics</h2>
        <p className="text-muted-foreground">Insights and metrics about your customer base</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Acquisition</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">New customers this month</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+23% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Lifetime Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$324</div>
            <p className="text-xs text-muted-foreground">Average CLV</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repeat Purchase Rate</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">Customers with 2+ orders</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15%</div>
            <p className="text-xs text-muted-foreground">Monthly churn rate</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />
              <span className="text-xs text-red-600">-3% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition Channels</CardTitle>
            <CardDescription>Where your customers are coming from</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { channel: "Organic Search", customers: 1247, percentage: 44 },
              { channel: "Social Media", customers: 856, percentage: 30 },
              { channel: "Email Marketing", customers: 427, percentage: 15 },
              { channel: "Paid Ads", customers: 284, percentage: 10 },
              { channel: "Referrals", customers: 33, percentage: 1 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.channel}</span>
                  <span className="font-medium">
                    {item.customers} ({item.percentage}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Behavior Patterns</CardTitle>
            <CardDescription>Key behavioral insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Peak Shopping Days</p>
                    <p className="text-xs text-muted-foreground">Friday & Saturday</p>
                  </div>
                </div>
                <Badge variant="secondary">Weekend</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Average Session Duration</p>
                    <p className="text-xs text-muted-foreground">8 minutes 34 seconds</p>
                  </div>
                </div>
                <Badge variant="secondary">+12%</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">Cart Abandonment Rate</p>
                    <p className="text-xs text-muted-foreground">32% of initiated checkouts</p>
                  </div>
                </div>
                <Badge variant="destructive">-5%</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-sm">Customer Satisfaction</p>
                    <p className="text-xs text-muted-foreground">4.7/5 average rating</p>
                  </div>
                </div>
                <Badge variant="default">Excellent</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Spending Customers</CardTitle>
            <CardDescription>Highest lifetime value customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Sarah Johnson", spent: 2156.75, orders: 25 },
                { name: "Mike Chen", spent: 1847.3, orders: 18 },
                { name: "Emma Davis", spent: 1634.5, orders: 22 },
                { name: "John Smith", spent: 1456.25, orders: 16 },
              ].map((customer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">{customer.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${customer.spent.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Geographic Distribution</CardTitle>
            <CardDescription>Customer locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { location: "California", customers: 847, percentage: 30 },
                { location: "New York", customers: 623, percentage: 22 },
                { location: "Texas", customers: 456, percentage: 16 },
                { location: "Florida", customers: 334, percentage: 12 },
                { location: "Others", customers: 587, percentage: 20 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.location}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.customers}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Purchase Frequency</CardTitle>
            <CardDescription>How often customers buy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { frequency: "Weekly", customers: 234, color: "bg-green-500" },
                { frequency: "Monthly", customers: 1456, color: "bg-blue-500" },
                { frequency: "Quarterly", customers: 892, color: "bg-yellow-500" },
                { frequency: "Yearly", customers: 265, color: "bg-red-500" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.frequency}</span>
                    <span className="font-medium">{item.customers}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${(item.customers / 2847) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
