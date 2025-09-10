import { type NextRequest, NextResponse } from "next/server"
import { zidApi } from "@/lib/zid-api"
import { handleApiError, createSuccessResponse } from "@/lib/api-utils"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the original product
    const originalProduct = await zidApi.getProduct(params.id)

    // Create a duplicate with modified name and SKU
    const duplicateData = {
      ...originalProduct,
      name: `${originalProduct.name} (Copy)`,
      sku: `${originalProduct.sku}-COPY-${Date.now()}`,
      id: undefined, // Remove ID so a new one is generated
    }

    const duplicatedProduct = await zidApi.createProduct(duplicateData)
    return NextResponse.json(createSuccessResponse(duplicatedProduct, "Product duplicated successfully"))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
