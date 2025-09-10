"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"

const orderStatuses = [
  { value: "all", label: "All Orders", count: 1234 },
  { value: "new", label: "New", count: 45 },
  { value: "processing", label: "Processing", count: 123 },
  { value: "shipped", label: "Shipped", count: 89 },
  { value: "delivered", label: "Delivered", count: 967 },
  { value: "cancelled", label: "Cancelled", count: 10 },
]

export function OrdersFilters() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const clearFilters = () => {
    setSelectedStatus("all")
    setDateFrom(undefined)
    setDateTo(undefined)
    setActiveFilters([])
  }

  return (
    <div className="space-y-4">
      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {orderStatuses.map((status) => (
          <Button
            key={status.value}
            variant={selectedStatus === status.value ? "default" : "outline"}
            className="gap-2"
            onClick={() => setSelectedStatus(status.value)}
          >
            {status.label}
            <Badge variant="secondary" className="ml-1">
              {status.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="cash_on_delivery">Cash on Delivery</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Shipping Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Shipping</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="pickup">Pickup</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <CalendarIcon className="h-4 w-4" />
                  {dateFrom ? format(dateFrom, "MMM dd") : "From Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <CalendarIcon className="h-4 w-4" />
                  {dateTo ? format(dateTo, "MMM dd") : "To Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateTo} onSelect={setDateTo} />
              </PopoverContent>
            </Popover>

            {activeFilters.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                <X className="h-3 w-3" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
