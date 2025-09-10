import { type NextRequest, NextResponse } from "next/server"
import { zidApi } from "@/lib/zid-api"
import { handleApiError, createSuccessResponse } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = {
      page: searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : undefined,
      page_size: searchParams.get("page_size") ? Number.parseInt(searchParams.get("page_size")!) : undefined,
      status: searchParams.get("status") || undefined,
      date_from: searchParams.get("date_from") || undefined,
      date_to: searchParams.get("date_to") || undefined,
    }

    const orders = await zidApi.getOrders(params)
    return NextResponse.json(createSuccessResponse(orders))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Basic validation
    if (!orderData.customer_id || !orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer ID and items are required",
        },
        { status: 400 },
      )
    }

    const newOrder = await zidApi.createOrder(orderData)
    return NextResponse.json(createSuccessResponse(newOrder, "Order created successfully"))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
