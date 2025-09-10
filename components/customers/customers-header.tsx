"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, UserPlus, TrendingUp, DollarSign, Loader2 } from "lucide-react"
import { CreateCustomerDialog } from "./create-customer-dialog"
import { useApi } from "@/hooks/use-api"
import { useToast } from "@/hooks/use-toast"

interface CustomerStats {
  total_customers: number
  new_customers_this_month: number
  average_ltv: number
  retention_rate: number
  growth_percentage: number
}

interface CustomersHeaderProps {
  onRefresh?: () => void
}

export function CustomersHeader({ onRefresh }: CustomersHeaderProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [stats, setStats] = useState<CustomerStats>({
    total_customers: 0,
    new_customers_this_month: 0,
    average_ltv: 0,
    retention_rate: 0,
    growth_percentage: 0,
  })

  const { data: statsData, loading, execute } = useApi<CustomerStats>()
  const { toast } = useToast()

  const loadStats = async () => {
    await execute(() => fetch("/api/customers/stats"))
  }

  useEffect(() => {
    loadStats()
  }, [])

  useEffect(() => {
    if (statsData) {
      setStats(statsData)
    }
  }, [statsData])

  const handleImportCustomers = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv,.xlsx"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const formData = new FormData()
      formData.append("file", file)

      try {
        const response = await fetch("/api/customers/import", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          toast({
            title: "Success",
            description: "Customers imported successfully",
          })
          loadStats()
          onRefresh?.()
        } else {
          throw new Error("Import failed")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to import customers",
          variant: "destructive",
        })
      }
    }
    input.click()
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
            <p className="text-muted-foreground">Manage customer relationships, segments, and communication</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 bg-transparent" onClick={handleImportCustomers}>
              <Plus className="h-4 w-4" />
              Import Customers
            </Button>
            <Button className="gap-2" onClick={() => setShowCreateDialog(true)}>
              <UserPlus className="h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.total_customers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.growth_percentage > 0 ? "+" : ""}
                {stats.growth_percentage}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.new_customers_this_month}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer LTV</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : `$${stats.average_ltv.toFixed(0)}`}
              </div>
              <p className="text-xs text-muted-foreground">Average lifetime value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : `${stats.retention_rate.toFixed(0)}%`}
              </div>
              <p className="text-xs text-muted-foreground">Customer retention</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateCustomerDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={() => {
          loadStats()
          onRefresh?.()
        }}
      />
    </>
  )
}
