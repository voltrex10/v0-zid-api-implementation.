import { type NextRequest, NextResponse } from "next/server"
import { zidApi } from "@/lib/zid-api"
import { handleApiError, createSuccessResponse } from "@/lib/api-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = await zidApi.getOrder(params.id)
    return NextResponse.json(createSuccessResponse(order))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updateData = await request.json()
    const updatedOrder = await zidApi.updateOrder(params.id, updateData)
    return NextResponse.json(createSuccessResponse(updatedOrder, "Order updated successfully"))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
