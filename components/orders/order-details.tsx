"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, User, MapPin, CreditCard, MessageSquare, Edit, RefreshCw, Download } from "lucide-react"

interface OrderDetailsProps {
  orderId: string
}

export function OrderDetails({ orderId }: OrderDetailsProps) {
  const mockOrder = {
    id: "12345",
    orderNumber: "#ZID-12345",
    status: "processing",
    customer: {
      name: "Ahmed Ali",
      email: "ahmed@example.com",
      phone: "+966501234567",
    },
    items: [
      {
        id: "1",
        name: "Wireless Headphones",
        sku: "WH-001",
        quantity: 2,
        price: 99.99,
        total: 199.98,
        image: "/diverse-people-listening-headphones.png",
      },
      {
        id: "2",
        name: "Phone Case",
        sku: "PC-002",
        quantity: 1,
        price: 25.5,
        total: 25.5,
        image: "/colorful-phone-case-display.png",
      },
    ],
    subtotal: 225.48,
    tax: 15.0,
    shipping: 5.0,
    discount: 0,
    total: 245.48,
    paymentMethod: "Credit Card",
    shippingMethod: "Express Delivery",
    shippingAddress: {
      name: "Ahmed Ali",
      address: "123 King Fahd Road",
      city: "Riyadh",
      country: "Saudi Arabia",
      zip: "12345",
      phone: "+966501234567",
    },
    billingAddress: {
      name: "Ahmed Ali",
      address: "123 King Fahd Road",
      city: "Riyadh",
      country: "Saudi Arabia",
      zip: "12345",
      phone: "+966501234567",
    },
    timeline: [
      { status: "Order Placed", date: "2024-01-15T10:30:00Z", description: "Order received and confirmed" },
      { status: "Payment Confirmed", date: "2024-01-15T10:35:00Z", description: "Payment processed successfully" },
      { status: "Processing", date: "2024-01-15T14:20:00Z", description: "Order is being prepared" },
    ],
    notes: [
      { id: "1", author: "System", content: "Order automatically confirmed", createdAt: "2024-01-15T10:30:00Z" },
      { id: "2", author: "Ahmed Ali", content: "Please deliver after 6 PM", createdAt: "2024-01-15T11:00:00Z" },
    ],
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{mockOrder.orderNumber}</h1>
          <p className="text-muted-foreground">Order placed on {formatDate(mockOrder.timeline[0].date)}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="default">Processing</Badge>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Invoice
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Edit className="h-4 w-4" />
            Edit Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.total)}</p>
                      <p className="text-sm text-muted-foreground">{formatCurrency(item.price)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(mockOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatCurrency(mockOrder.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatCurrency(mockOrder.shipping)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(mockOrder.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrder.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Order Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrder.notes.map((note) => (
                  <div key={note.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</span>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <Textarea placeholder="Add a note..." />
                <Button size="sm">Add Note</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Current Status</label>
                <Select defaultValue="processing">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full gap-2">
                <RefreshCw className="h-4 w-4" />
                Update Status
              </Button>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{mockOrder.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{mockOrder.customer.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Phone:</span> {mockOrder.customer.phone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p className="font-medium">{mockOrder.shippingAddress.name}</p>
                <p>{mockOrder.shippingAddress.address}</p>
                <p>
                  {mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.zip}
                </p>
                <p>{mockOrder.shippingAddress.country}</p>
                <p>{mockOrder.shippingAddress.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Shipping */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment & Shipping
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground">{mockOrder.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Shipping Method</p>
                <p className="text-sm text-muted-foreground">{mockOrder.shippingMethod}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
