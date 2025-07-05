"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import SetupGuide from "@/components/setup-guide"

export default function SetupPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header com botão voltar */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 mr-4" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar</span>
          </Button>
          <h1 className="text-xl font-semibold">Configuração do Google OAuth</h1>
        </div>
      </header>

      <div className="container mx-auto py-8">
        <SetupGuide />
      </div>
    </div>
  )
}
