import { NextResponse } from "next/server"
import { verifyAuthToken } from "@/lib/verifyAuthToken"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    await verifyAuthToken(request)
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized', status: 401 }, { status: 401 })
  }
    const body = await request.json()

    // Check if the required angle data is present
    if (!body.microNiche || !body.reframedProblem) {
      return NextResponse.json({ error: "Missing required angle data" }, { status: 400 })
    }

    // Simulate saving to database
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Generate a mock ID for the saved angle
    const savedAngle = {
      id: `angle_${Date.now()}`,
      ...body,
      savedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Angle saved successfully",
      angleId: savedAngle.id,
    })
  } catch (error) {
    console.error("Error saving angle:", error)
    return NextResponse.json({ success: false, error: "Failed to save angle" }, { status: 500 })
  }
}
