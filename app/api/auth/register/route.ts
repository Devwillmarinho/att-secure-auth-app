import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Simulação de banco de dados em memória
const users: Array<{
  id: string
  name: string
  email: string
  password: string
  provider: "local" | "google"
  createdAt: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validações
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "A senha deve ter pelo menos 6 caracteres" }, { status: 400 })
    }

    // Verificar se o usuário já existe
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "Este email já está cadastrado" }, { status: 400 })
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 12)

    // Criar usuário
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      provider: "local" as const,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    return NextResponse.json({ message: "Usuário criado com sucesso" }, { status: 201 })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
