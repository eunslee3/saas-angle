import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Check if email is already in use (mock check)
    if (email === "taken@example.com") {
      return NextResponse.json({ success: false, error: "Email is already in use" }, { status: 409 })
    }

    // Mock user creation
    const user = {
      id: "user_" + Math.random().toString(36).substring(2, 9),
      email,
      firstName: firstName || email.split("@")[0],
      lastName: lastName || "",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user,
      token: "mock_jwt_token_" + Math.random().toString(36).substring(2, 15),
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ success: false, error: "Registration failed" }, { status: 500 })
  }
}
