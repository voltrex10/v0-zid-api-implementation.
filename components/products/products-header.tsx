"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Download, Upload, RefreshCw, Grid, List } from "lucide-react"
import { useState } from "react"
import { CreateProductDialog } from "./create-product-dialog"
import { useToast } from "@/hooks/use-toast"

interface ProductsHeaderProps {
  onSearch?: (query: string) => void
  onRefresh?: () => void
  viewMode?: "grid" | "list"
  onViewModeChange?: (mode: "grid" | "list") => void
}

export function ProductsHeader({ onSearch, onRefresh, viewMode = "grid", onViewModeChange }: ProductsHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const { toast } = useToast()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleExport = async () => {
    try {
      const response = await fetch("/api/products/export")
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `products-${new Date().toISOString().split("T")[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        toast({
          title: "Success",
          description: "Products exported successfully",
        })
      } else {
        throw new Error("Export failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export products",
        variant: "destructive",
      })
    }
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv,.xlsx"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const formData = new FormData()
      formData.append("file", file)

      try {
        const response = await fetch("/api/products/import", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          toast({
            title: "Success",
            description: "Products imported successfully",
          })
          onRefresh?.()
        } else {
          throw new Error("Import failed")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to import products",
          variant: "destructive",
        })
      }
    }
    input.click()
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products Management</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 w-80"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => onViewModeChange?.("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => onViewModeChange?.("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="icon" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button variant="outline" className="gap-2 bg-transparent" onClick={handleImport}>
            <Upload className="h-4 w-4" />
            Import
          </Button>

          <Button variant="outline" className="gap-2 bg-transparent" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>

          <Button className="gap-2" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <CreateProductDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </>
  )
}
