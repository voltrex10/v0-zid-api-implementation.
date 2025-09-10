"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Search, X } from "lucide-react"

interface OrderItem {
  id: string
  productId: string
  name: string
  sku: string
  price: number
  quantity: number
  total: number
}

export function CreateOrderForm() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [customerSearch, setCustomerSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  const addOrderItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      productId: "",
      name: "",
      sku: "",
      price: 0,
      quantity: 1,
      total: 0,
    }
    setOrderItems([...orderItems, newItem])
  }

  const removeOrderItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id))
  }

  const updateOrderItem = (id: string, field: keyof OrderItem, value: any) => {
    setOrderItems(
      orderItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === "price" || field === "quantity") {
            updatedItem.total = updatedItem.price * updatedItem.quantity
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.15 // 15% tax
  const shipping = 25.0
  const total = subtotal + tax + shipping

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Order</h1>
        <p className="text-muted-foreground">Create a new order for your customer</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Select or create a customer for this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers by name or email..."
                  className="pl-10"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                />
              </div>

              {selectedCustomer ? (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{selectedCustomer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedCustomer(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input id="customerName" placeholder="Enter customer name" />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input id="customerEmail" type="email" placeholder="customer@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone</Label>
                    <Input id="customerPhone" placeholder="+966501234567" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Add products to this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderItems.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1 grid grid-cols-5 gap-4">
                      <div>
                        <Label>Product</Label>
                        <Input
                          placeholder="Search products..."
                          value={item.name}
                          onChange={(e) => updateOrderItem(item.id, "name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>SKU</Label>
                        <Input value={item.sku} onChange={(e) => updateOrderItem(item.id, "sku", e.target.value)} />
                      </div>
                      <div>
                        <Label>Price</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => updateOrderItem(item.id, "price", Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateOrderItem(item.id, "quantity", Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateOrderItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                            className="w-20 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateOrderItem(item.id, "quantity", item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Total</Label>
                        <p className="text-lg font-medium mt-2">{formatCurrency(item.total)}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeOrderItem(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button variant="outline" onClick={addOrderItem} className="w-full gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sa">Saudi Arabia</SelectItem>
                      <SelectItem value="ae">UAE</SelectItem>
                      <SelectItem value="kw">Kuwait</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Add any special instructions or notes for this order..." />
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="cash_on_delivery">Cash on Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Shipping Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (3-5 days)</SelectItem>
                      <SelectItem value="express">Express (1-2 days)</SelectItem>
                      <SelectItem value="pickup">Store Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (15%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Button className="w-full" disabled={orderItems.length === 0}>
                    Create Order
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Save as Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
