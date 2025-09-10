"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Package, TrendingUp, TrendingDown, Star, Eye, ShoppingCart } from "lucide-react"

export function ProductAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Product Performance</h2>
        <p className="text-muted-foreground">Analyze product sales, inventory, and customer engagement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23</span> added this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Seller</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Wireless Headphones sold</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">Across all products</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Products with highest revenue this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Wireless Headphones",
                  sales: 156,
                  revenue: 7800,
                  growth: 23,
                  trend: "up",
                },
                {
                  name: "Smart Watch",
                  sales: 134,
                  revenue: 6700,
                  growth: 18,
                  trend: "up",
                },
                {
                  name: "Laptop Stand",
                  sales: 98,
                  revenue: 2940,
                  growth: -5,
                  trend: "down",
                },
                {
                  name: "USB-C Cable",
                  sales: 87,
                  revenue: 1305,
                  growth: 12,
                  trend: "up",
                },
                {
                  name: "Phone Case",
                  sales: 76,
                  revenue: 1520,
                  growth: 8,
                  trend: "up",
                },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales} units • ${product.revenue}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={product.trend === "up" ? "default" : "destructive"} className="text-xs">
                      {product.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(product.growth)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Categories Performance</CardTitle>
            <CardDescription>Sales distribution by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { category: "Electronics", products: 234, sales: 1847, percentage: 45 },
              { category: "Clothing", products: 456, sales: 1234, percentage: 30 },
              { category: "Home & Garden", products: 189, sales: 567, percentage: 14 },
              { category: "Books", products: 234, sales: 345, percentage: 8 },
              { category: "Sports", products: 134, sales: 123, percentage: 3 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    {item.category}
                    <Badge variant="outline" className="text-xs">
                      {item.products}
                    </Badge>
                  </span>
                  <span className="font-medium">{item.sales} sales</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>Stock levels across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: "In Stock", count: 1156, color: "bg-green-500" },
                { status: "Low Stock", count: 67, color: "bg-yellow-500" },
                { status: "Out of Stock", count: 24, color: "bg-red-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm">{item.status}</span>
                  </div>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Engagement</CardTitle>
            <CardDescription>Views and interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Views</span>
                </div>
                <span className="font-medium">45,231</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Add to Cart</span>
                </div>
                <span className="font-medium">3,456</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Reviews</span>
                </div>
                <span className="font-medium">1,234</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <span className="font-bold text-green-600">7.6%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Price Analysis</CardTitle>
            <CardDescription>Pricing insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Price</span>
                <span className="font-medium">$47.89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Highest Price</span>
                <span className="font-medium">$299.99</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Lowest Price</span>
                <span className="font-medium">$9.99</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Price Range Distribution</span>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-xs">
                    <span>$0-$25</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-1" />
                  <div className="flex justify-between text-xs">
                    <span>$25-$100</span>
                    <span>35%</span>
                  </div>
                  <Progress value={35} className="h-1" />
                  <div className="flex justify-between text-xs">
                    <span>$100+</span>
                    <span>20%</span>
                  </div>
                  <Progress value={20} className="h-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Performance Matrix</CardTitle>
          <CardDescription>Sales vs. Profit margin analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Product Performance Matrix Chart Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
