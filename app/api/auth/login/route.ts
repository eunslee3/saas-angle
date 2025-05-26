import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { supabase } from "@/lib/supabaseClient"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Lookup user by email
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, password_hash")
      .eq("email", email)
      .single()

    if (error || !user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    })
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return response
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
