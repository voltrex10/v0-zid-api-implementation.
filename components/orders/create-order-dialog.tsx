"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useApi } from "@/hooks/use-api"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface CreateOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateOrderDialog({ open, onOpenChange }: CreateOrderDialogProps) {
  const [formData, setFormData] = useState({
    customer_id: "",
    customer_email: "",
    customer_name: "",
    customer_phone: "",
    items: [{ product_id: "", quantity: 1, price: 0 }],
    shipping_method: "standard",
    payment_method: "credit_card",
    notes: "",
  })

  const { loading, execute } = useApi()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.customer_email || formData.items.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const result = await execute(() =>
      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }),
    )

    if (result.success) {
      toast({
        title: "Success",
        description: "Order created successfully",
      })
      onOpenChange(false)
      setFormData({
        customer_id: "",
        customer_email: "",
        customer_name: "",
        customer_phone: "",
        items: [{ product_id: "", quantity: 1, price: 0 }],
        shipping_method: "standard",
        payment_method: "credit_card",
        notes: "",
      })
      // Refresh orders list
      window.location.reload()
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to create order",
        variant: "destructive",
      })
    }
  }

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product_id: "", quantity: 1, price: 0 }],
    })
  }

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    })
  }

  const updateItem = (index: number, field: string, value: any) => {
    const updatedItems = formData.items.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setFormData({ ...formData, items: updatedItems })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer_email">Customer Email *</Label>
              <Input
                id="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_name">Customer Name</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Order Items *</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                Add Item
              </Button>
            </div>

            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 p-3 border rounded">
                <Input
                  placeholder="Product ID"
                  value={item.product_id}
                  onChange={(e) => updateItem(index, "product_id", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Quantity"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value))}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(index, "price", Number.parseFloat(e.target.value))}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeItem(index)}
                  disabled={formData.items.length === 1}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shipping_method">Shipping Method</Label>
              <Select
                value={formData.shipping_method}
                onValueChange={(value) => setFormData({ ...formData, shipping_method: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Shipping</SelectItem>
                  <SelectItem value="express">Express Shipping</SelectItem>
                  <SelectItem value="pickup">Store Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment_method">Payment Method</Label>
              <Select
                value={formData.payment_method}
                onValueChange={(value) => setFormData({ ...formData, payment_method: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash_on_delivery">Cash on Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any special instructions or notes..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
