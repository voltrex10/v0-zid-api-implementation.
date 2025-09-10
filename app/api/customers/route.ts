import { type NextRequest, NextResponse } from "next/server"
import { zidApi } from "@/lib/zid-api"
import { handleApiError, createSuccessResponse } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = {
      page: searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : undefined,
      page_size: searchParams.get("page_size") ? Number.parseInt(searchParams.get("page_size")!) : undefined,
      search: searchParams.get("search") || undefined,
    }

    const customers = await zidApi.getCustomers(params)
    return NextResponse.json(createSuccessResponse(customers))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
