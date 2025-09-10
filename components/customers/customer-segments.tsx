"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Users, Target, TrendingUp, Edit, Trash2 } from "lucide-react"

const mockSegments = [
  {
    id: "1",
    name: "VIP Customers",
    description: "High-value customers with 10+ orders or $1000+ spent",
    customerCount: 234,
    criteria: "Total spent > $1000 OR Total orders > 10",
    avgOrderValue: 156.78,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "2",
    name: "Regular Customers",
    description: "Active customers with 3-9 orders",
    customerCount: 1456,
    criteria: "Total orders between 3-9 AND Last order < 90 days",
    avgOrderValue: 89.45,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "3",
    name: "New Customers",
    description: "Recently joined customers with 1-2 orders",
    customerCount: 567,
    criteria: "Total orders <= 2 AND Join date < 30 days",
    avgOrderValue: 67.23,
    color: "bg-green-100 text-green-800",
  },
  {
    id: "4",
    name: "At-Risk Customers",
    description: "Customers who haven't ordered in 90+ days",
    customerCount: 189,
    criteria: "Last order > 90 days AND Total orders > 1",
    avgOrderValue: 78.9,
    color: "bg-red-100 text-red-800",
  },
]

export function CustomerSegments() {
  const [segments, setSegments] = useState(mockSegments)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Segments</h2>
          <p className="text-muted-foreground">Organize customers into targeted groups for better marketing</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Segment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Segment</DialogTitle>
              <DialogDescription>Define criteria to automatically group customers</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="segment-name">Segment Name</Label>
                <Input id="segment-name" placeholder="High-Value Customers" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="segment-description">Description</Label>
                <Input id="segment-description" placeholder="Customers with high lifetime value" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="criteria-type">Criteria Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select criteria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="total-spent">Total Amount Spent</SelectItem>
                    <SelectItem value="order-count">Number of Orders</SelectItem>
                    <SelectItem value="last-order">Days Since Last Order</SelectItem>
                    <SelectItem value="join-date">Days Since Joining</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="operator">Operator</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="greater">Greater than</SelectItem>
                      <SelectItem value="less">Less than</SelectItem>
                      <SelectItem value="equal">Equal to</SelectItem>
                      <SelectItem value="between">Between</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input id="value" type="number" placeholder="1000" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Segment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {segments.map((segment) => (
          <Card key={segment.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge className={segment.color}>{segment.name}</Badge>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{segment.customerCount}</CardTitle>
              <CardDescription className="text-xs">customers in this segment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{segment.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Order Value:</span>
                  <span className="font-medium">${segment.avgOrderValue}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <strong>Criteria:</strong> {segment.criteria}
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                <Target className="h-3 w-3" />
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Segment Performance
            </CardTitle>
            <CardDescription>Revenue contribution by customer segment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {segments.map((segment, index) => {
                const revenue = segment.customerCount * segment.avgOrderValue
                const totalRevenue = segments.reduce((sum, s) => sum + s.customerCount * s.avgOrderValue, 0)
                const percentage = Math.round((revenue / totalRevenue) * 100)

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{segment.name}</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Segment Growth
            </CardTitle>
            <CardDescription>Monthly growth rate by segment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "VIP Customers", growth: 15, trend: "up" },
                { name: "Regular Customers", growth: 8, trend: "up" },
                { name: "New Customers", growth: 23, trend: "up" },
                { name: "At-Risk Customers", growth: -12, trend: "down" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {item.growth > 0 ? "+" : ""}
                      {item.growth}%
                    </span>
                    <TrendingUp
                      className={`h-4 w-4 ${item.trend === "up" ? "text-green-600" : "text-red-600 rotate-180"}`}
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
