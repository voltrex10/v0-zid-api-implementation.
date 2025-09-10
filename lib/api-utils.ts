// API Response Types and Utilities
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    current_page: number
    total_pages: number
    per_page: number
    total: number
  }
}

// Error handling utility
export function handleApiError(error: any): ApiResponse {
  console.error("[v0] API Error:", error)

  if (error.message?.includes("401")) {
    return {
      success: false,
      error: "Authentication failed. Please check your access token.",
    }
  }

  if (error.message?.includes("403")) {
    return {
      success: false,
      error: "Access denied. Insufficient permissions.",
    }
  }

  if (error.message?.includes("404")) {
    return {
      success: false,
      error: "Resource not found.",
    }
  }

  if (error.message?.includes("429")) {
    return {
      success: false,
      error: "Rate limit exceeded. Please try again later.",
    }
  }

  return {
    success: false,
    error: error.message || "An unexpected error occurred",
  }
}

// Success response utility
export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  }
}

// Validation utilities
export function validateRequired(fields: Record<string, any>): string | null {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return `${key} is required`
    }
  }
  return null
}
