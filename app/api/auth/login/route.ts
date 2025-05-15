import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication logic
    // In a real app, you would verify credentials against a database
    if (email.includes("@") && password.length >= 6) {
      // Mock successful authentication
      return NextResponse.json({
        success: true,
        token: "mock_jwt_token_" + Math.random().toString(36).substring(2, 15),
        user: {
          id: "user_123",
          email,
          name: email.split("@")[0],
          createdAt: new Date().toISOString(),
        },
      })
    } else {
      // Mock authentication failure
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 })
  }
}
