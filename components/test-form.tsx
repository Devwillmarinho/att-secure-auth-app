"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, TestTube } from "lucide-react"

export default function TestForm() {
  const [testEmail, setTestEmail] = useState("")
  const [testResults, setTestResults] = useState<{ email: string; valid: boolean }[]>([])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const testEmailValidation = () => {
    const testEmails = [
      "usuario@email.com",
      "test@example.org",
      "invalid-email",
      "user@domain",
      "281518225129-0mgp6tr3895s8gb9pkn1bart4ob66lke.apps.googleusercontent.com",
      "valid.email@test.co.uk",
      "@invalid.com",
      "user@",
      "user@domain.",
    ]

    const results = testEmails.map((email) => ({
      email,
      valid: validateEmail(email),
    }))

    setTestResults(results)
  }

  const handleTestSingleEmail = () => {
    if (testEmail) {
      const result = { email: testEmail, valid: validateEmail(testEmail) }
      setTestResults([result])
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TestTube className="h-5 w-5 mr-2" />
          Teste de Validação de Email
        </CardTitle>
        <CardDescription>Teste a validação de email para diagnosticar problemas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Teste Individual */}
        <div className="space-y-3">
          <Label htmlFor="test-email">Testar Email Individual</Label>
          <div className="flex space-x-2">
            <Input
              id="test-email"
              type="text"
              placeholder="Digite um email para testar"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTestSingleEmail} disabled={!testEmail}>
              Testar
            </Button>
          </div>
        </div>

        {/* Teste em Lote */}
        <div>
          <Button onClick={testEmailValidation} variant="outline" className="w-full bg-transparent">
            Executar Teste Completo de Validação
          </Button>
        </div>

        {/* Resultados */}
        {testResults.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Resultados dos Testes:</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    result.valid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  <span className="font-mono text-sm break-all">{result.email}</span>
                  <div className="flex items-center space-x-2">
                    {result.valid ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 text-sm">Válido</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-red-600 text-sm">Inválido</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explicação */}
        <Alert>
          <AlertDescription>
            <strong>Como funciona a validação:</strong>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Deve conter exatamente um símbolo @</li>
              <li>• Deve ter texto antes e depois do @</li>
              <li>• Deve ter um ponto (.) no domínio</li>
              <li>• Não pode começar ou terminar com @</li>
              <li>• Google Client IDs são automaticamente rejeitados</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
