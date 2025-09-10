import { type NextRequest, NextResponse } from "next/server"
import { zidApi } from "@/lib/zid-api"
import { handleApiError, createSuccessResponse } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const { product_ids } = await request.json()

    if (!product_ids || !Array.isArray(product_ids) || product_ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Product IDs are required",
        },
        { status: 400 },
      )
    }

    // Delete products one by one (Zid API might not support bulk delete)
    const results = await Promise.allSettled(product_ids.map((id: string) => zidApi.deleteProduct(id)))

    const successful = results.filter((result) => result.status === "fulfilled").length
    const failed = results.length - successful

    return NextResponse.json(
      createSuccessResponse(
        { successful, failed },
        `${successful} products deleted successfully${failed > 0 ? `, ${failed} failed` : ""}`,
      ),
    )
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
