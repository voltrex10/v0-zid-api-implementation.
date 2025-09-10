"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, ImageIcon } from "lucide-react"

interface ProductImage {
  id: string
  url: string
  alt: string
  position: number
}

interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  attributes: { [key: string]: string }
}

export function CreateProductForm() {
  const [productImages, setProductImages] = useState<ProductImage[]>([])
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [trackInventory, setTrackInventory] = useState(true)
  const [hasVariants, setHasVariants] = useState(false)

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      name: "",
      sku: "",
      price: 0,
      stock: 0,
      attributes: {},
    }
    setVariants([...variants, newVariant])
  }

  const removeVariant = (id: string) => {
    setVariants(variants.filter((variant) => variant.id !== id))
  }

  const updateVariant = (id: string, field: keyof ProductVariant, value: any) => {
    setVariants(variants.map((variant) => (variant.id === id ? { ...variant, [field]: value } : variant)))
  }

  const addImage = () => {
    const newImage: ProductImage = {
      id: Date.now().toString(),
      url: "/placeholder.svg?height=200&width=200",
      alt: "",
      position: productImages.length,
    }
    setProductImages([...productImages, newImage])
  }

  const removeImage = (id: string) => {
    setProductImages(productImages.filter((image) => image.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Product</h1>
        <p className="text-muted-foreground">Add a new product to your catalog</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential product details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input id="productName" placeholder="Enter product name" />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Product SKU" />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Product description" rows={4} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Enter tags separated by commas" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
              <CardDescription>Set product pricing and cost details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="comparePrice">Compare at Price</Label>
                  <Input id="comparePrice" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="costPrice">Cost per Item</Label>
                  <Input id="costPrice" type="number" step="0.01" placeholder="0.00" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="taxable" />
                <Label htmlFor="taxable">Charge tax on this product</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track and manage product inventory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="trackInventory" checked={trackInventory} onCheckedChange={setTrackInventory} />
                <Label htmlFor="trackInventory">Track inventory for this product</Label>
              </div>

              {trackInventory && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" type="number" placeholder="0" />
                    </div>
                    <div>
                      <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                      <Input id="lowStockThreshold" type="number" placeholder="5" />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" type="number" step="0.01" placeholder="0.00" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="continueSellingOutOfStock" />
                    <Label htmlFor="continueSellingOutOfStock">Continue selling when out of stock</Label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Upload and manage product images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  {productImages.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      {index === 0 && (
                        <Badge className="absolute top-2 left-2" variant="default">
                          Main
                        </Badge>
                      )}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="h-32 border-dashed gap-2 flex-col bg-transparent"
                    onClick={addImage}
                  >
                    <Upload className="h-6 w-6" />
                    <span className="text-sm">Upload Image</span>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  First image will be used as the main product image. Drag to reorder.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Variants</CardTitle>
              <CardDescription>Create variants for different sizes, colors, etc.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="hasVariants" checked={hasVariants} onCheckedChange={setHasVariants} />
                <Label htmlFor="hasVariants">This product has multiple variants</Label>
              </div>

              {hasVariants && (
                <div className="space-y-4">
                  {variants.map((variant, index) => (
                    <div key={variant.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Variant {index + 1}</h4>
                        <Button variant="ghost" size="icon" onClick={() => removeVariant(variant.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <Label>Variant Name</Label>
                          <Input
                            placeholder="e.g., Red - Large"
                            value={variant.name}
                            onChange={(e) => updateVariant(variant.id, "name", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>SKU</Label>
                          <Input
                            placeholder="Variant SKU"
                            value={variant.sku}
                            onChange={(e) => updateVariant(variant.id, "sku", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Price</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={variant.price}
                            onChange={(e) => updateVariant(variant.id, "price", Number.parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label>Stock</Label>
                          <Input
                            type="number"
                            value={variant.stock}
                            onChange={(e) => updateVariant(variant.id, "stock", Number.parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" onClick={addVariant} className="gap-2 bg-transparent">
                    <Plus className="h-4 w-4" />
                    Add Variant
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Engine Optimization</CardTitle>
              <CardDescription>Optimize your product for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input id="seoTitle" placeholder="Product SEO title" />
                <p className="text-sm text-muted-foreground mt-1">0 of 60 characters used</p>
              </div>

              <div>
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea id="seoDescription" placeholder="Product SEO description" rows={3} />
                <p className="text-sm text-muted-foreground mt-1">0 of 160 characters used</p>
              </div>

              <div>
                <Label htmlFor="urlHandle">URL Handle</Label>
                <Input id="urlHandle" placeholder="product-url-handle" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-6 border-t">
        <Button className="gap-2">
          <ImageIcon className="h-4 w-4" />
          Save Product
        </Button>
        <Button variant="outline" className="bg-transparent">
          Save as Draft
        </Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  )
}
