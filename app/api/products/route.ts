import { type NextRequest, NextResponse } from "next/server"
import { zidApi } from "@/lib/zid-api"
import { handleApiError, createSuccessResponse, validateRequired } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = {
      page: searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : undefined,
      page_size: searchParams.get("page_size") ? Number.parseInt(searchParams.get("page_size")!) : undefined,
      category_id: searchParams.get("category_id") || undefined,
      search: searchParams.get("search") || undefined,
    }

    const products = await zidApi.getProducts(params)
    return NextResponse.json(createSuccessResponse(products))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    // Validate required fields
    const validationError = validateRequired({
      name: productData.name,
      price: productData.price,
      category_id: productData.category_id,
    })

    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          error: validationError,
        },
        { status: 400 },
      )
    }

    const newProduct = await zidApi.createProduct(productData)
    return NextResponse.json(createSuccessResponse(newProduct, "Product created successfully"))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
