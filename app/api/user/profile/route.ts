import { NextResponse } from "next/server"

export async function GET() {
  // Mock user profile data
  const profile = {
    id: "user_123",
    email: "user@example.com",
    firstName: "Alex",
    lastName: "Johnson",
    createdAt: "2023-10-15T08:30:00Z",
    subscription: {
      plan: "Pro",
      status: "active",
      nextBillingDate: "2023-12-15T08:30:00Z",
      features: ["Unlimited angles", "Export to PDF", "API access"],
    },
    usage: {
      anglesGenerated: 24,
      anglesSaved: 12,
      lastActive: "2023-11-22T14:20:00Z",
    },
  }

  // Add a small delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600))

  return NextResponse.json({ profile })
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // Simulate updating user profile
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Return updated profile with merged data
    const updatedProfile = {
      id: "user_123",
      email: body.email || "user@example.com",
      firstName: body.firstName || "Alex",
      lastName: body.lastName || "Johnson",
      updatedAt: new Date().toISOString(),
      // Other fields would remain unchanged
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 })
  }
}
