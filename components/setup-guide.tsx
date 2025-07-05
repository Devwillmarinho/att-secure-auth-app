"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Circle, ExternalLink, Copy, Settings, Globe, Shield, AlertTriangle } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Criar Projeto no Google Cloud",
    description: "Configure um novo projeto no Google Cloud Console",
    details: [
      "Acesse https://console.cloud.google.com/",
      "Clique no seletor de projetos no topo",
      "Clique em 'Novo Projeto'",
      "Nome: LoginSocialApp (ou outro nome)",
      "Clique em 'Criar'",
    ],
  },
  {
    id: 2,
    title: "Ativar Google+ API",
    description: "Habilite as APIs necessárias para autenticação",
    details: [
      "No menu lateral: 'APIs e serviços' > 'Bibliotecas'",
      "Busque por 'Google+ API' ou 'People API'",
      "Clique na API e depois em 'Ativar'",
      "Aguarde a ativação (pode levar alguns minutos)",
    ],
  },
  {
    id: 3,
    title: "Configurar Tela de Consentimento",
    description: "Configure a tela que os usuários verão ao fazer login",
    details: [
      "Vá para 'APIs e serviços' > 'Tela de consentimento OAuth'",
      "Selecione 'Externo' e clique em 'Criar'",
      "Preencha os campos obrigatórios:",
      "• Nome do app: Login Social App",
      "• Email de suporte: seu email",
      "• Email de desenvolvedor: seu email",
      "Clique em 'Salvar e continuar' nas próximas etapas",
    ],
  },
  {
    id: 4,
    title: "Criar Credenciais OAuth",
    description: "Gere as credenciais para sua aplicação",
    details: [
      "Vá para 'APIs e serviços' > 'Credenciais'",
      "Clique em '+ Criar credenciais' > 'ID do cliente OAuth'",
      "Tipo: 'Aplicativo da Web'",
      "Nome: LoginLocal (ou outro nome)",
      "URIs de redirecionamento autorizados:",
      "• http://localhost:3000/api/auth/google/callback",
    ],
  },
  {
    id: 5,
    title: "Configurar Variáveis de Ambiente",
    description: "Adicione as credenciais ao seu projeto",
    details: [
      "Copie o Client ID e Client Secret gerados",
      "Crie/edite o arquivo .env.local na raiz do projeto",
      "Adicione as variáveis conforme o exemplo abaixo",
    ],
  },
]

export default function SetupGuide() {
  const router = useRouter()
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showEnvExample, setShowEnvExample] = useState(false)

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const envExample = `# Google OAuth Configuration
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Next.js URL
NEXTAUTH_URL=http://localhost:3000

# Session Secret (gere uma chave aleatória)
SESSION_SECRET=sua_chave_secreta_super_forte_aqui`

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Configuração do Google OAuth</h1>
        <p className="text-gray-600">Siga este guia passo a passo para configurar a autenticação com Google</p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Importante:</strong> Mantenha suas credenciais seguras e nunca as compartilhe publicamente.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {steps.map((step) => (
          <Card key={step.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" onClick={() => toggleStep(step.id)} className="p-0 h-6 w-6">
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                  <div>
                    <CardTitle className="text-lg">
                      Passo {step.id}: {step.title}
                    </CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={completedSteps.includes(step.id) ? "default" : "secondary"}>
                  {completedSteps.includes(step.id) ? "Concluído" : "Pendente"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {step.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-sm">{detail}</span>
                  </li>
                ))}
              </ul>

              {step.id === 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 bg-transparent"
                  onClick={() => window.open("https://console.cloud.google.com/", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir Google Cloud Console
                </Button>
              )}

              {step.id === 5 && (
                <div className="mt-4 space-y-3">
                  <Button variant="outline" size="sm" onClick={() => setShowEnvExample(!showEnvExample)}>
                    <Settings className="h-4 w-4 mr-2" />
                    {showEnvExample ? "Ocultar" : "Mostrar"} Exemplo .env.local
                  </Button>

                  {showEnvExample && (
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        onClick={() => copyToClipboard(envExample)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm overflow-x-auto">
                        <code>{envExample}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Configuração Completa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 mb-4">
            Após completar todos os passos, sua aplicação estará pronta para usar o Google OAuth!
          </p>
          <div className="space-y-2 text-sm text-green-600 mb-4">
            <p>
              ✅ Reinicie o servidor de desenvolvimento: <code>npm run dev</code>
            </p>
            <p>✅ Teste o login com Google na página de login</p>
            <p>✅ Verifique se o perfil do usuário é carregado corretamente</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={() => router.push("/login")} className="bg-green-600 hover:bg-green-700">
              Testar Login
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Voltar ao Início
            </Button>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Globe className="h-4 w-4" />
        <AlertDescription>
          <strong>Para produção:</strong> Lembre-se de atualizar as URLs de redirecionamento no Google Cloud Console e
          as variáveis de ambiente com os valores de produção.
        </AlertDescription>
      </Alert>
    </div>
  )
}
