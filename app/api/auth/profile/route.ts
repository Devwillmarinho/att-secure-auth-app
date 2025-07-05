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

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const sessionData = JSON.parse(sessionCookie.value)
    const user = users.find((u) => u.id === sessionData.userId)

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    // Retornar dados do usuário (sem senha)
    const { password, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Profile error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
