// Zid API Type Definitions

export interface ZidOrder {
  id: string
  order_number: string
  status: "new" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
  customer: {
    id: string
    name: string
    email: string
    phone?: string
  }
  items: ZidOrderItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  created_at: string
  updated_at: string
  shipping_address?: ZidAddress
  billing_address?: ZidAddress
  payment_method?: string
  notes?: string
}

export interface ZidOrderItem {
  id: string
  product_id: string
  product_name: string
  sku?: string
  quantity: number
  price: number
  total: number
  variant_id?: string
  customizations?: any[]
}

export interface ZidProduct {
  id: string
  name: string
  description?: string
  sku?: string
  price: number
  compare_price?: number
  cost_price?: number
  status: "active" | "inactive" | "draft"
  inventory_tracking: boolean
  inventory_quantity: number
  weight?: number
  images: ZidProductImage[]
  categories: ZidCategory[]
  attributes: ZidProductAttribute[]
  variants?: ZidProductVariant[]
  seo_title?: string
  seo_description?: string
  created_at: string
  updated_at: string
}

export interface ZidProductImage {
  id: string
  url: string
  alt_text?: string
  position: number
}

export interface ZidProductVariant {
  id: string
  sku?: string
  price: number
  compare_price?: number
  inventory_quantity: number
  attributes: { [key: string]: string }
}

export interface ZidProductAttribute {
  id: string
  name: string
  value: string
  type: "text" | "number" | "select" | "multiselect"
}

export interface ZidCategory {
  id: string
  name: string
  description?: string
  parent_id?: string
  status: "active" | "inactive"
  products_count: number
  image?: string
  seo_title?: string
  seo_description?: string
}

export interface ZidCustomer {
  id: string
  name: string
  email: string
  phone?: string
  status: "active" | "inactive"
  orders_count: number
  total_spent: number
  addresses: ZidAddress[]
  created_at: string
  updated_at: string
}

export interface ZidAddress {
  id: string
  first_name: string
  last_name: string
  company?: string
  address1: string
  address2?: string
  city: string
  country: string
  zip: string
  phone?: string
}

export interface ZidLocation {
  id: string
  name: string
  address: string
  city: string
  country: string
  is_default: boolean
  status: "active" | "inactive"
}

export interface ZidCoupon {
  id: string
  code: string
  type: "percentage" | "fixed_amount"
  value: number
  minimum_amount?: number
  usage_limit?: number
  used_count: number
  starts_at?: string
  ends_at?: string
  status: "active" | "inactive"
}

export interface ZidWebhook {
  id: string
  url: string
  events: string[]
  status: "active" | "inactive"
  created_at: string
}

export interface ApiResponse<T> {
  data: T
  meta?: {
    current_page: number
    total_pages: number
    total_count: number
    per_page: number
  }
  success: boolean
  message?: string
}
