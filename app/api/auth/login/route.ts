import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { supabase } from "@/lib/supabaseClient"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body
    const isProduction = process.env.NODE_ENV === 'production'

    console.log('Login request received')

    // Basic validation
    if (!email || !password) {
      console.log('Missing required fields')
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Lookup user by email
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, password_hash")
      .eq("email", email)
      .single()

    if (error || !user) {
      console.log('User not found')
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatch) {
      console.log('Invalid credentials')
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

    if (rememberMe) {
      response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: isProduction,
        path: "/",
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })
    } else {
      console.log('no remember me')
      // No session duration - cookie will expire when browser is closed
      response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: isProduction,
        path: "/"
      })
    }

    console.log('Response: ', response)

    return response
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
