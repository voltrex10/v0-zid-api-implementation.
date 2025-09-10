"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RotateCcw, Search, Plus } from "lucide-react"

const mockReverseOrders = [
  {
    id: "RO-001",
    originalOrderId: "12345",
    orderNumber: "#ZID-12345",
    customer: "Ahmed Ali",
    reason: "Defective Product",
    status: "pending",
    requestDate: "2024-01-15T10:30:00Z",
    amount: 99.99,
    items: ["Wireless Headphones"],
  },
  {
    id: "RO-002",
    originalOrderId: "12346",
    orderNumber: "#ZID-12346",
    customer: "Sara Mohammed",
    reason: "Wrong Size",
    status: "approved",
    requestDate: "2024-01-14T14:20:00Z",
    amount: 45.5,
    items: ["T-Shirt"],
  },
]

const reverseReasons = [
  "Defective Product",
  "Wrong Size",
  "Wrong Color",
  "Not as Described",
  "Damaged in Shipping",
  "Customer Changed Mind",
  "Other",
]

export function ReverseOrders() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState("")
  const [selectedReason, setSelectedReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [notes, setNotes] = useState("")

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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Pending" },
      approved: { variant: "default" as const, label: "Approved" },
      rejected: { variant: "destructive" as const, label: "Rejected" },
      completed: { variant: "outline" as const, label: "Completed" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleCreateReverseOrder = () => {
    // Handle reverse order creation
    console.log({
      orderId: selectedOrderId,
      reason: selectedReason === "Other" ? customReason : selectedReason,
      notes,
    })
    setIsCreateDialogOpen(false)
    // Reset form
    setSelectedOrderId("")
    setSelectedReason("")
    setCustomReason("")
    setNotes("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reverse Orders</h1>
          <p className="text-muted-foreground">Manage returns and refund requests</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Reverse Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Reverse Order</DialogTitle>
              <DialogDescription>Create a return or refund request for an existing order</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="orderId">Order ID</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="orderId"
                    placeholder="Search order by ID or number..."
                    className="pl-10"
                    value={selectedOrderId}
                    onChange={(e) => setSelectedOrderId(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Reason for Return</Label>
                <Select value={selectedReason} onValueChange={setSelectedReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {reverseReasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedReason === "Other" && (
                <div>
                  <Label htmlFor="customReason">Custom Reason</Label>
                  <Input
                    id="customReason"
                    placeholder="Enter custom reason..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional information..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateReverseOrder} className="flex-1">
                  Create Reverse Order
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reverse Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Reverse Orders ({mockReverseOrders.length})</CardTitle>
          <CardDescription>All return and refund requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReverseOrders.map((reverseOrder) => (
              <div
                key={reverseOrder.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <RotateCcw className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">{reverseOrder.id}</p>
                    <p className="text-sm text-muted-foreground">Original Order: {reverseOrder.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">Customer: {reverseOrder.customer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Reason</p>
                    <p className="font-medium">{reverseOrder.reason}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium">{formatCurrency(reverseOrder.amount)}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Status</p>
                    {getStatusBadge(reverseOrder.status)}
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Requested</p>
                    <p className="text-xs">{formatDate(reverseOrder.requestDate)}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {reverseOrder.status === "pending" && (
                      <>
                        <Button variant="default" size="sm">
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm">
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <p className="text-sm text-muted-foreground">Showing 1-2 of 2 reverse orders</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
