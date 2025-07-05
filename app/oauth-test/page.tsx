import OAuthTester from "@/components/oauth-tester"
import PageHeader from "@/components/page-header"

export default function OAuthTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <PageHeader title="Teste Google OAuth" backHref="/" />
      <div className="container mx-auto px-4 py-8">
        <OAuthTester />
      </div>
    </div>
  )
}
