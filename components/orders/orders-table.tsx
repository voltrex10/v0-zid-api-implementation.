"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, Edit, Truck, RefreshCw, MessageSquare, Loader2 } from "lucide-react"
import { useApi } from "@/hooks/use-api"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  order_number: string
  customer: {
    name: string
    email: string
  }
  status: string
  total: number
  items_count: number
  payment_method: string
  shipping_method: string
  created_at: string
  updated_at: string
}

interface OrdersResponse {
  data: Order[]
  pagination: {
    current_page: number
    total_pages: number
    per_page: number
    total: number
  }
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    new: { variant: "secondary" as const, label: "New" },
    processing: { variant: "default" as const, label: "Processing" },
    shipped: { variant: "outline" as const, label: "Shipped" },
    delivered: { variant: "default" as const, label: "Delivered" },
    cancelled: { variant: "destructive" as const, label: "Cancelled" },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new
  return <Badge variant={config.variant}>{config.label}</Badge>
}

interface OrdersTableProps {
  searchQuery?: string
  filters?: {
    status?: string
    date_from?: string
    date_to?: string
  }
}

export function OrdersTable({ searchQuery, filters }: OrdersTableProps) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { data: ordersData, loading, error, execute } = useApi<OrdersResponse>()
  const { toast } = useToast()

  const loadOrders = async (page = 1) => {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: "10",
      ...(filters?.status && { status: filters.status }),
      ...(filters?.date_from && { date_from: filters.date_from }),
      ...(filters?.date_to && { date_to: filters.date_to }),
    })

    await execute(() => fetch(`/api/orders?${params}`))
  }

  useEffect(() => {
    loadOrders(currentPage)
  }, [currentPage, filters])

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    const result = await execute(() =>
      fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }),
    )

    if (result.success) {
      toast({
        title: "Success",
        description: "Order status updated successfully",
      })
      loadOrders(currentPage)
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update order status",
        variant: "destructive",
      })
    }
  }

  const handleViewOrder = (orderId: string) => {
    // Navigate to order details page
    window.location.href = `/orders/${orderId}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
    }).format(amount)
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <p>Error loading orders: {error}</p>
            <Button onClick={() => loadOrders(currentPage)} className="mt-2">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const orders = ordersData?.data || []
  const pagination = ordersData?.pagination

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Orders ({pagination?.total || 0})</span>
          <div className="flex items-center gap-2">
            {selectedOrders.length > 0 && <Badge variant="secondary">{selectedOrders.length} selected</Badge>}
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading && orders.length === 0 ? (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              <p className="text-muted-foreground">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={selectedOrders.includes(order.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrders([...selectedOrders, order.id])
                      } else {
                        setSelectedOrders(selectedOrders.filter((id) => id !== order.id))
                      }
                    }}
                  />

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {order.customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Status</p>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Items</p>
                    <p className="font-medium">{order.items_count}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-medium">{formatCurrency(order.total)}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Payment</p>
                    <p className="text-xs">{order.payment_method}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="text-xs">{formatDate(order.created_at)}</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2" onClick={() => handleViewOrder(order.id)}>
                        <Eye className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2" onClick={() => handleViewOrder(order.id)}>
                        <Edit className="h-4 w-4" />
                        Edit Order
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Add Note
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => handleUpdateOrderStatus(order.id, "processing")}
                      >
                        <Truck className="h-4 w-4" />
                        Mark Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2" onClick={() => handleUpdateOrderStatus(order.id, "shipped")}>
                        <Truck className="h-4 w-4" />
                        Mark Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Create Return
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>

        {pagination && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {(pagination.current_page - 1) * pagination.per_page + 1}-
              {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total} orders
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.current_page <= 1 || loading}
                onClick={() => setCurrentPage(pagination.current_page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.current_page >= pagination.total_pages || loading}
                onClick={() => setCurrentPage(pagination.current_page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
