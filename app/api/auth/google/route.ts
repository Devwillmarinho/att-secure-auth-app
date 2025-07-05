import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("🚀 Rota /api/auth/google chamada");
  console.log("📍 URL da requisição:", request.url);
  console.log("📍 Method:", request.method);

  try {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI ||
      `${
        process.env.NEXTAUTH_URL || "http://localhost:3000"
      }/api/auth/google/callback`;

    console.log("🔧 Variáveis de ambiente:");
    console.log(
      "  - GOOGLE_CLIENT_ID:",
      googleClientId ? "✅ Configurado" : "❌ Não configurado"
    );
    console.log(
      "  - GOOGLE_CLIENT_SECRET:",
      googleClientSecret ? "✅ Configurado" : "❌ Não configurado"
    );
    console.log("  - GOOGLE_REDIRECT_URI:", redirectUri);
    console.log(
      "  - NEXTAUTH_URL:",
      process.env.NEXTAUTH_URL || "Não configurado"
    );

    if (!googleClientId) {
      console.error("❌ GOOGLE_CLIENT_ID não configurado");
      return NextResponse.redirect(
        new URL(
          "/login?error=Configuração do Google OAuth incompleta",
          request.url
        )
      );
    }

    if (!googleClientSecret) {
      console.error("❌ GOOGLE_CLIENT_SECRET não configurado");
      return NextResponse.redirect(
        new URL(
          "/login?error=Google Client Secret não configurado",
          request.url
        )
      );
    }

    // Verificar se o Client ID não está sendo usado incorretamente
    if (googleClientId.includes("@")) {
      console.error("❌ GOOGLE_CLIENT_ID parece estar incorreto - contém @");
      return NextResponse.redirect(
        new URL(
          "/login?error=Google Client ID configurado incorretamente",
          request.url
        )
      );
    }

    const params = new URLSearchParams({
      client_id: googleClientId,
      redirect_uri: redirectUri,
      scope: "openid profile email",
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
      state: "security_token_here",
    });

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    console.log("🔄 Redirecionando para Google OAuth:");
    console.log("  URL:", googleAuthUrl);
    console.log("  Parâmetros:", Object.fromEntries(params.entries()));

    return NextResponse.redirect(googleAuthUrl);
  } catch (error) {
    console.error("❌ Erro na rota Google OAuth:", error);
    console.error(
      "❌ Stack trace:",
      error instanceof Error ? error.stack : "Sem stack trace"
    );

    return NextResponse.json(
      {
        error: "Erro interno no Google OAuth",
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
