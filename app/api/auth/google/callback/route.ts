import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Simulação de banco de dados em memória
const users: Array<{
  id: string
  name: string
  email: string
  password: string
  provider: "local" | "google"
  avatar?: string
  createdAt: string
}> = []

interface GoogleTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  id_token: string
}

interface GoogleUserInfo {
  id: string
  email: string
  name: string
  picture: string
  given_name: string
  family_name: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    if (error) {
      console.error("Google OAuth error:", error)
      return NextResponse.redirect(new URL("/login?error=Erro no login com Google", request.url))
    }

    if (!code) {
      return NextResponse.redirect(new URL("/login?error=Código de autorização não encontrado", request.url))
    }

    // Trocar código por token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri:
          process.env.GOOGLE_REDIRECT_URI ||
          `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/google/callback`,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error("Falha ao obter token do Google")
    }

    const tokenData: GoogleTokenResponse = await tokenResponse.json()

    // Obter informações do usuário
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      throw new Error("Falha ao obter informações do usuário")
    }

    const googleUser: GoogleUserInfo = await userResponse.json()

    // Verificar se o usuário já existe
    let user = users.find((u) => u.email === googleUser.email && u.provider === "google")

    if (!user) {
      // Criar novo usuário Google
      user = {
        id: `google_${googleUser.id}`,
        name: googleUser.name,
        email: googleUser.email,
        password: "", // Não usado para login Google
        provider: "google",
        avatar: googleUser.picture,
        createdAt: new Date().toISOString(),
      }
      users.push(user)
    } else {
      // Atualizar avatar se mudou
      user.avatar = googleUser.picture
    }

    // Criar sessão
    const sessionData = {
      userId: user.id,
      email: user.email,
      name: user.name,
      provider: user.provider,
    }

    const cookieStore = cookies()
    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    return NextResponse.redirect(new URL("/profile", request.url))
  } catch (error) {
    console.error("Google callback error:", error)
    return NextResponse.redirect(new URL("/login?error=Erro no login com Google", request.url))
  }
}
