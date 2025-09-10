"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, Edit, Copy, Trash2, Package, Star, Loader2 } from "lucide-react"
import { useApi } from "@/hooks/use-api"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  sku: string
  price: number
  compare_price?: number
  status: string
  stock_quantity: number
  category: {
    name: string
  }
  images: Array<{ url: string }>
  rating?: number
  reviews_count?: number
  variants_count?: number
}

interface ProductsResponse {
  data: Product[]
  pagination: {
    current_page: number
    total_pages: number
    per_page: number
    total: number
  }
}

interface ProductsGridProps {
  searchQuery?: string
  filters?: {
    category_id?: string
    status?: string
    price_min?: number
    price_max?: number
  }
  viewMode?: "grid" | "list"
}

export function ProductsGrid({ searchQuery, filters, viewMode = "grid" }: ProductsGridProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { data: productsData, loading, error, execute } = useApi<ProductsResponse>()
  const { toast } = useToast()

  const loadProducts = async (page = 1) => {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: "12",
      ...(searchQuery && { search: searchQuery }),
      ...(filters?.category_id && { category_id: filters.category_id }),
      ...(filters?.status && { status: filters.status }),
    })

    await execute(() => fetch(`/api/products?${params}`))
  }

  useEffect(() => {
    loadProducts(currentPage)
  }, [currentPage, searchQuery, filters])

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    const result = await execute(() =>
      fetch(`/api/products/${productId}`, {
        method: "DELETE",
      }),
    )

    if (result.success) {
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
      loadProducts(currentPage)
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const handleDuplicateProduct = async (productId: string) => {
    const result = await execute(() =>
      fetch(`/api/products/${productId}/duplicate`, {
        method: "POST",
      }),
    )

    if (result.success) {
      toast({
        title: "Success",
        description: "Product duplicated successfully",
      })
      loadProducts(currentPage)
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to duplicate product",
        variant: "destructive",
      })
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) return

    const result = await execute(() =>
      fetch("/api/products/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_ids: selectedProducts }),
      }),
    )

    if (result.success) {
      toast({
        title: "Success",
        description: `${selectedProducts.length} products deleted successfully`,
      })
      setSelectedProducts([])
      loadProducts(currentPage)
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to delete products",
        variant: "destructive",
      })
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, label: "Active" },
      inactive: { variant: "secondary" as const, label: "Inactive" },
      draft: { variant: "outline" as const, label: "Draft" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock < 10) {
      return <Badge variant="secondary">Low Stock</Badge>
    } else {
      return <Badge variant="outline">In Stock</Badge>
    }
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <p>Error loading products: {error}</p>
            <Button onClick={() => loadProducts(currentPage)} className="mt-2">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const products = productsData?.data || []
  const pagination = productsData?.pagination

  return (
    <div className="space-y-6">
      {selectedProducts.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{selectedProducts.length} products selected</Badge>
                <Button variant="outline" size="sm" disabled={loading}>
                  Bulk Edit
                </Button>
                <Button variant="outline" size="sm" disabled={loading}>
                  Export Selected
                </Button>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete} disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete Selected
                </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedProducts([])}>
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading && products.length === 0 ? (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No products found</p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.images?.[0]?.url || "/placeholder.svg?height=200&width=300&query=product"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2">{getStatusBadge(product.status)}</div>
                  <div className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts([...selectedProducts, product.id])
                        } else {
                          setSelectedProducts(selectedProducts.filter((id) => id !== product.id))
                        }
                      }}
                    />
                  </div>
                  {product.compare_price && product.compare_price > product.price && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="destructive">
                        {Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                  </div>

                  {(product.rating || product.reviews_count) && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{product.rating || 0}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews_count || 0})</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="font-bold">{formatCurrency(product.price)}</span>
                    {product.compare_price && product.compare_price > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatCurrency(product.compare_price)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Stock: </span>
                      <span className="font-medium">{product.stock_quantity}</span>
                    </div>
                    {getStockBadge(product.stock_quantity)}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{product.category?.name || "Uncategorized"}</span>
                    <span>{product.variants_count || 1} variants</span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1 bg-transparent"
                      onClick={() => (window.location.href = `/products/${product.id}`)}
                    >
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1 bg-transparent"
                      onClick={() => (window.location.href = `/products/${product.id}/edit`)}
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => handleDuplicateProduct(product.id)}>
                          <Copy className="h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => (window.location.href = `/products/${product.id}/inventory`)}
                        >
                          <Package className="h-4 w-4" />
                          Manage Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {pagination && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(pagination.current_page - 1) * pagination.per_page + 1}-
            {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total} products
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
    </div>
  )
}
