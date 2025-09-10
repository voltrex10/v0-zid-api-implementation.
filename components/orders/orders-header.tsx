"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Download, RefreshCw } from "lucide-react"
import { CreateOrderDialog } from "./create-order-dialog"
import { useToast } from "@/hooks/use-toast"

interface OrdersHeaderProps {
  onSearch?: (query: string) => void
  onRefresh?: () => void
}

export function OrdersHeader({ onSearch, onRefresh }: OrdersHeaderProps) {
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
      const response = await fetch("/api/orders/export")
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        toast({
          title: "Success",
          description: "Orders exported successfully",
        })
      } else {
        throw new Error("Export failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export orders",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders Management</h1>
          <p className="text-muted-foreground">Manage and track all your Zid store orders</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-10 w-80" value={searchQuery} onChange={handleSearch} />
          </div>

          <Button variant="outline" size="icon" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button variant="outline" className="gap-2 bg-transparent" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>

          <Button className="gap-2" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4" />
            Create Order
          </Button>
        </div>
      </div>

      <CreateOrderDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </>
  )
}
