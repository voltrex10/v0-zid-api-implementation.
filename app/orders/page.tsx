"use client"

import { useState } from "react"
import { OrdersHeader } from "@/components/orders/orders-header"
import { OrdersTable } from "@/components/orders/orders-table"
import { OrdersFilters } from "@/components/orders/orders-filters"

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<{
    status?: string
    date_from?: string
    date_to?: string
  }>({})
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <OrdersHeader onSearch={handleSearch} onRefresh={handleRefresh} />
            <OrdersFilters onFiltersChange={handleFiltersChange} />
            <OrdersTable key={refreshKey} searchQuery={searchQuery} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}
