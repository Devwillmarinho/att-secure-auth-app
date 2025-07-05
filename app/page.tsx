"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Lock, Globe, TestTube } from "lucide-react"

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/profile")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (user) {
    router.push("/profile")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">SecureAuth</h1>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => router.push("/oauth-test")}>
              <TestTube className="h-4 w-4 mr-2" />
              Testar OAuth
            </Button>
            <Button variant="ghost" onClick={() => router.push("/setup")}>
              Configurar Google
            </Button>
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Entrar
            </Button>
            <Button onClick={() => router.push("/register")}>Cadastrar</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Autenticação Segura e Simples</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Faça login com email/senha ou com sua conta Google. Sua segurança é nossa prioridade.
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => router.push("/register")}>
              Começar Agora
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/login")}>
              Já tenho conta
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Segurança Avançada</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Senhas criptografadas com bcrypt e sessões seguras</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Login Social</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Entre facilmente com sua conta Google</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Perfil Personalizado</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Gerencie suas informações de forma simples</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Test Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white mb-8">
          <h3 className="text-3xl font-bold mb-4">Teste suas credenciais Google OAuth</h3>
          <p className="text-xl mb-6 opacity-90">Verifique se sua configuração está funcionando corretamente</p>
          <Button size="lg" variant="secondary" onClick={() => router.push("/oauth-test")}>
            <TestTube className="h-4 w-4 mr-2" />
            Testar Agora
          </Button>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Pronto para começar?</h3>
          <p className="text-xl mb-6 opacity-90">Crie sua conta em segundos e tenha acesso completo</p>
          <Button size="lg" variant="secondary" onClick={() => router.push("/register")}>
            Criar Conta Grátis
          </Button>
        </div>
      </main>
    </div>
  )
}
