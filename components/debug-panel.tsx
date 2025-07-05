"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"

export default function DebugPanel() {
  const [showEnvVars, setShowEnvVars] = useState(false)
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})

  const testGoogleOAuth = async () => {
    try {
      const response = await fetch("/api/auth/google")
      setTestResults({ ...testResults, googleOAuth: response.ok })
    } catch (error) {
      setTestResults({ ...testResults, googleOAuth: false })
    }
  }

  const testEmailValidation = () => {
    const testEmails = ["test@example.com", "invalid-email", "user@domain", "valid.email@test.co.uk"]

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const results = testEmails.map((email) => emailRegex.test(email))

    setTestResults({
      ...testResults,
      emailValidation: results.filter(Boolean).length === 2, // Deve validar 2 emails corretos
    })
  }

  const envVars = [
    { name: "GOOGLE_CLIENT_ID", value: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "Não configurado" },
    { name: "NEXTAUTH_URL", value: process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000" },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Painel de Debug
        </CardTitle>
        <CardDescription>Ferramentas para diagnosticar problemas de autenticação</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Variáveis de Ambiente */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Variáveis de Ambiente</h3>
            <Button variant="outline" size="sm" onClick={() => setShowEnvVars(!showEnvVars)}>
              {showEnvVars ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>

          {showEnvVars && (
            <div className="space-y-2">
              {envVars.map((env) => (
                <div key={env.name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-mono text-sm">{env.name}</span>
                  <Badge variant={env.value !== "Não configurado" ? "default" : "destructive"}>
                    {env.value === "Não configurado" ? "❌" : "✅"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Testes */}
        <div>
          <h3 className="font-semibold mb-2">Testes de Funcionalidade</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Google OAuth</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={testGoogleOAuth}>
                  Testar
                </Button>
                {testResults.googleOAuth !== undefined &&
                  (testResults.googleOAuth ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>Validação de Email</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={testEmailValidation}>
                  Testar
                </Button>
                {testResults.emailValidation !== undefined &&
                  (testResults.emailValidation ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dicas de Solução */}
        <Alert>
          <AlertDescription>
            <strong>Dicas para resolver problemas:</strong>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Verifique se todas as variáveis de ambiente estão configuradas</li>
              <li>• Certifique-se de que o arquivo .env.local está na raiz do projeto</li>
              <li>• Reinicie o servidor após alterar variáveis de ambiente</li>
              <li>• Verifique se as URLs de redirecionamento estão corretas no Google Cloud</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
