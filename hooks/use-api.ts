"use client"

import { useState, useCallback } from "react"
import type { ApiResponse } from "@/lib/api-utils"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T = any>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async (apiCall: () => Promise<Response>): Promise<ApiResponse<T>> => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await apiCall()
      const result: ApiResponse<T> = await response.json()

      if (result.success) {
        setState({
          data: result.data || null,
          loading: false,
          error: null,
        })
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: result.error || "An error occurred",
        }))
      }

      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Network error"
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))

      return {
        success: false,
        error: errorMessage,
      }
    }
  }, [])

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}
