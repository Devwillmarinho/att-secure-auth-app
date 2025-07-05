import TestForm from "@/components/test-form"
import PageHeader from "@/components/page-header"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <PageHeader title="Teste de Validação" backHref="/" />
      <div className="container mx-auto px-4 py-8">
        <TestForm />
      </div>
    </div>
  )
}
