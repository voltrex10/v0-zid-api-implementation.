// Zid API Configuration and Utilities
export const ZID_API_BASE = "https://api.zid.sa"

export interface ZidApiConfig {
  storeId: string
  accessToken: string
  baseUrl?: string
}

export class ZidApiClient {
  private config: ZidApiConfig

  constructor(config: ZidApiConfig) {
    this.config = {
      ...config,
      baseUrl: config.baseUrl || ZID_API_BASE,
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.config.accessToken}`,
        "Content-Type": "application/json",
        "X-Store-ID": this.config.storeId,
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Orders API Methods
  async getOrders(params?: {
    page?: number
    page_size?: number
    status?: string
    date_from?: string
    date_to?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request(`/orders?${queryParams.toString()}`)
  }

  async getOrder(orderId: string) {
    return this.request(`/orders/${orderId}`)
  }

  async updateOrder(orderId: string, data: any) {
    return this.request(`/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async createOrder(orderData: any) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  }

  // Products API Methods
  async getProducts(params?: {
    page?: number
    page_size?: number
    category_id?: string
    search?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request(`/products?${queryParams.toString()}`)
  }

  async getProduct(productId: string) {
    return this.request(`/products/${productId}`)
  }

  async createProduct(productData: any) {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    })
  }

  async updateProduct(productId: string, data: any) {
    return this.request(`/products/${productId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteProduct(productId: string) {
    return this.request(`/products/${productId}`, {
      method: "DELETE",
    })
  }

  // Categories API Methods
  async getCategories() {
    return this.request("/categories")
  }

  async getCategory(categoryId: string) {
    return this.request(`/categories/${categoryId}`)
  }

  async createCategory(categoryData: any) {
    return this.request("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    })
  }

  // Customers API Methods
  async getCustomers(params?: {
    page?: number
    page_size?: number
    search?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request(`/customers?${queryParams.toString()}`)
  }

  async getCustomer(customerId: string) {
    return this.request(`/customers/${customerId}`)
  }

  async createCustomer(customerData: any) {
    return this.request("/customers", {
      method: "POST",
      body: JSON.stringify(customerData),
    })
  }

  async updateCustomer(customerId: string, data: any) {
    return this.request(`/customers/${customerId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteCustomer(customerId: string) {
    return this.request(`/customers/${customerId}`, {
      method: "DELETE",
    })
  }

  async getCustomerStats() {
    return this.request("/customers/stats")
  }

  async sendCustomerEmail(emailData: any) {
    return this.request("/customers/send-email", {
      method: "POST",
      body: JSON.stringify(emailData),
    })
  }

  async importCustomers(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    return this.request("/customers/import", {
      method: "POST",
      body: formData,
      headers: {
        // Remove Content-Type to let browser set it with boundary for FormData
        Authorization: `Bearer ${this.config.accessToken}`,
        "X-Store-ID": this.config.storeId,
      },
    })
  }

  // Inventory API Methods
  async getLocations() {
    return this.request("/locations")
  }

  async getProductStock(productId: string) {
    return this.request(`/products/${productId}/stock`)
  }

  async updateProductStock(productId: string, stockData: any) {
    return this.request(`/products/${productId}/stock`, {
      method: "PUT",
      body: JSON.stringify(stockData),
    })
  }

  // Webhooks API Methods
  async getWebhooks() {
    return this.request("/webhooks")
  }

  async createWebhook(webhookData: any) {
    return this.request("/webhooks", {
      method: "POST",
      body: JSON.stringify(webhookData),
    })
  }

  async deleteWebhook(webhookId: string) {
    return this.request(`/webhooks/${webhookId}`, {
      method: "DELETE",
    })
  }

  async testWebhook(webhookId: string) {
    return this.request(`/webhooks/${webhookId}/test`, {
      method: "POST",
    })
  }
}

// Default client instance (will be configured with environment variables)
export const zidApi = new ZidApiClient({
  storeId: process.env.ZID_STORE_ID || "",
  accessToken: process.env.ZID_ACCESS_TOKEN || "",
})
