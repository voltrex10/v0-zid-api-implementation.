import { NextResponse } from "next/server"
import { zidApi } from "@/lib/zid-api"
import { handleApiError, createSuccessResponse } from "@/lib/api-utils"

export async function GET() {
  try {
    const stats = await zidApi.getCustomerStats()
    return NextResponse.json(createSuccessResponse(stats))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
