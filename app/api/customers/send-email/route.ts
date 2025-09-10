import { type NextRequest, NextResponse } from "next/server"
import { zidApi } from "@/lib/zid-api"
import { handleApiError, createSuccessResponse, validateRequired } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const emailData = await request.json()

    const validationError = validateRequired({
      customer_id: emailData.customer_id,
      email: emailData.email,
      subject: emailData.subject,
      message: emailData.message,
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

    const result = await zidApi.sendCustomerEmail(emailData)
    return NextResponse.json(createSuccessResponse(result, "Email sent successfully"))
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
