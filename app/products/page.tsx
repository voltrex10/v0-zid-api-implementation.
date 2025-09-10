"use client"

import { useState } from "react"
import { ProductsHeader } from "@/components/products/products-header"
import { ProductsFilters } from "@/components/products/products-filters"
import { ProductsGrid } from "@/components/products/products-grid"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<{
    category_id?: string
    status?: string
    price_min?: number
    price_max?: number
  }>({})
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
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
            <ProductsHeader
              onSearch={handleSearch}
              onRefresh={handleRefresh}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            <ProductsFilters onFiltersChange={handleFiltersChange} />
            <ProductsGrid key={refreshKey} searchQuery={searchQuery} filters={filters} viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  )
}
