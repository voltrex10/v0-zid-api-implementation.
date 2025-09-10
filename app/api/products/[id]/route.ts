import { type NextRequest, NextResponse } from "next/server"
import { zidApi } from "@/lib/zid-api"
import { handleApiError, createSuccessResponse } from "@/lib/api-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await zidApi.getProduct(params.id)
    return NextResponse.json(createSuccessResponse(product))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updateData = await request.json()
    const updatedProduct = await zidApi.updateProduct(params.id, updateData)
    return NextResponse.json(createSuccessResponse(updatedProduct, "Product updated successfully"))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await zidApi.deleteProduct(params.id)
    return NextResponse.json(createSuccessResponse(null, "Product deleted successfully"))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
