import { type NextRequest, NextResponse } from "next/server"
import { zidApi } from "@/lib/zid-api"
import { handleApiError, createSuccessResponse } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file provided",
        },
        { status: 400 },
      )
    }

    // Process the CSV/Excel file and import customers
    const result = await zidApi.importCustomers(file)
    return NextResponse.json(createSuccessResponse(result, "Customers imported successfully"))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
