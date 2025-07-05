import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()

    // Remover cookie de sessão
    cookieStore.delete("session")

    return NextResponse.json({ message: "Logout realizado com sucesso" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
