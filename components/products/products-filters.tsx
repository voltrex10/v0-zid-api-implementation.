"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Filter, X } from "lucide-react"

const productStatuses = [
  { value: "all", label: "All Products", count: 856 },
  { value: "active", label: "Active", count: 734 },
  { value: "inactive", label: "Inactive", count: 89 },
  { value: "draft", label: "Draft", count: 33 },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home & Garden" },
  { value: "sports", label: "Sports" },
]

export function ProductsFilters() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const clearFilters = () => {
    setSelectedStatus("all")
    setPriceRange([0, 1000])
    setActiveFilters([])
  }

  return (
    <div className="space-y-4">
      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {productStatuses.map((status) => (
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
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-sm">Price:</span>
              <div className="w-32">
                <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
              </div>
              <span className="text-sm text-muted-foreground">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name_asc">Name A-Z</SelectItem>
                <SelectItem value="name_desc">Name Z-A</SelectItem>
                <SelectItem value="price_asc">Price Low-High</SelectItem>
                <SelectItem value="price_desc">Price High-Low</SelectItem>
                <SelectItem value="created_desc">Newest First</SelectItem>
                <SelectItem value="created_asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>

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
