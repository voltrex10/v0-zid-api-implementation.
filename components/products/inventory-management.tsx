"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Package, Plus, Minus, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

const mockLocations = [
  { id: "1", name: "Main Warehouse", city: "Riyadh", country: "Saudi Arabia", isDefault: true },
  { id: "2", name: "Dubai Branch", city: "Dubai", country: "UAE", isDefault: false },
  { id: "3", name: "Kuwait Store", city: "Kuwait City", country: "Kuwait", isDefault: false },
]

const mockInventory = [
  {
    productId: "1",
    productName: "Wireless Headphones",
    sku: "WH-001",
    locations: [
      { locationId: "1", locationName: "Main Warehouse", stock: 45, reserved: 5, available: 40 },
      { locationId: "2", locationName: "Dubai Branch", stock: 23, reserved: 2, available: 21 },
      { locationId: "3", locationName: "Kuwait Store", stock: 12, reserved: 0, available: 12 },
    ],
    totalStock: 80,
    lowStockThreshold: 10,
  },
  {
    productId: "2",
    productName: "Cotton T-Shirt",
    sku: "CT-002",
    locations: [
      { locationId: "1", locationName: "Main Warehouse", stock: 120, reserved: 15, available: 105 },
      { locationId: "2", locationName: "Dubai Branch", stock: 45, reserved: 8, available: 37 },
      { locationId: "3", locationName: "Kuwait Store", stock: 0, reserved: 0, available: 0 },
    ],
    totalStock: 165,
    lowStockThreshold: 20,
  },
]

export function InventoryManagement() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [adjustmentType, setAdjustmentType] = useState<"increase" | "decrease">("increase")
  const [adjustmentQuantity, setAdjustmentQuantity] = useState(0)
  const [adjustmentReason, setAdjustmentReason] = useState("")

  const getStockStatus = (available: number, threshold: number) => {
    if (available === 0) {
      return { status: "out", label: "Out of Stock", variant: "destructive" as const }
    } else if (available <= threshold) {
      return { status: "low", label: "Low Stock", variant: "secondary" as const }
    } else {
      return { status: "good", label: "In Stock", variant: "outline" as const }
    }
  }

  const handleStockAdjustment = () => {
    console.log({
      productId: selectedProduct?.productId,
      adjustmentType,
      quantity: adjustmentQuantity,
      reason: adjustmentReason,
    })
    setIsAdjustDialogOpen(false)
    setSelectedProduct(null)
    setAdjustmentQuantity(0)
    setAdjustmentReason("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage stock across all locations</p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Location
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="adjustments">Stock Adjustments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">856</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Immediate action needed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Stock Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Product Inventory</CardTitle>
                  <CardDescription>Stock levels across all locations</CardDescription>
                </div>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {mockLocations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInventory.map((item) => (
                  <div key={item.productId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{item.productName}</h4>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total Stock</p>
                          <p className="font-bold">{item.totalStock}</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedProduct(item)}>
                              Adjust Stock
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Adjust Stock - {item.productName}</DialogTitle>
                              <DialogDescription>Make inventory adjustments for this product</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              <div>
                                <Label>Adjustment Type</Label>
                                <Select value={adjustmentType} onValueChange={(value: any) => setAdjustmentType(value)}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="increase">Increase Stock</SelectItem>
                                    <SelectItem value="decrease">Decrease Stock</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label>Quantity</Label>
                                <Input
                                  type="number"
                                  value={adjustmentQuantity}
                                  onChange={(e) => setAdjustmentQuantity(Number.parseInt(e.target.value) || 0)}
                                />
                              </div>

                              <div>
                                <Label>Reason</Label>
                                <Select value={adjustmentReason} onValueChange={setAdjustmentReason}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select reason" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="restock">Restock</SelectItem>
                                    <SelectItem value="damaged">Damaged Goods</SelectItem>
                                    <SelectItem value="theft">Theft/Loss</SelectItem>
                                    <SelectItem value="correction">Inventory Correction</SelectItem>
                                    <SelectItem value="return">Customer Return</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex gap-2 pt-4">
                                <Button onClick={handleStockAdjustment} className="flex-1">
                                  Apply Adjustment
                                </Button>
                                <Button variant="outline" className="flex-1 bg-transparent">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {item.locations.map((location) => {
                        const stockStatus = getStockStatus(location.available, item.lowStockThreshold)
                        return (
                          <div key={location.locationId} className="p-3 bg-muted rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium text-sm">{location.locationName}</span>
                              </div>
                              <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div>
                                <p className="text-muted-foreground">Stock</p>
                                <p className="font-medium">{location.stock}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Reserved</p>
                                <p className="font-medium">{location.reserved}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Available</p>
                                <p className="font-medium">{location.available}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Locations</CardTitle>
              <CardDescription>Manage your warehouse and store locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLocations.map((location) => (
                  <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MapPin className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{location.name}</h4>
                          {location.isDefault && <Badge variant="default">Default</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {location.city}, {location.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View Inventory
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adjustments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Stock Adjustments</CardTitle>
              <CardDescription>History of inventory adjustments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Plus className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Wireless Headphones - Restock</p>
                      <p className="text-sm text-muted-foreground">+50 units • Main Warehouse</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                    <p className="text-sm">By Admin</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Minus className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Cotton T-Shirt - Damaged Goods</p>
                      <p className="text-sm text-muted-foreground">-5 units • Dubai Branch</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                    <p className="text-sm">By Manager</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Reports</CardTitle>
              <CardDescription>Generate and download inventory reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Package className="h-5 w-5" />
                  Stock Level Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <TrendingDown className="h-5 w-5" />
                  Low Stock Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <TrendingUp className="h-5 w-5" />
                  Stock Movement Report
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <AlertTriangle className="h-5 w-5" />
                  Inventory Valuation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
