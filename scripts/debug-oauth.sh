#!/bin/bash

echo "🔍 Diagnóstico de OAuth - Verificando configuração..."
echo ""

# Verificar se o arquivo .env.local existe
if [ -f ".env.local" ]; then
    echo "✅ Arquivo .env.local encontrado"
    echo "📄 Conteúdo do .env.local:"
    echo "----------------------------------------"
    cat .env.local | grep -E "GOOGLE_|NEXTAUTH_" | sed 's/=.*/=***OCULTO***/'
    echo "----------------------------------------"
else
    echo "❌ Arquivo .env.local NÃO encontrado!"
    echo "💡 Crie o arquivo .env.local na raiz do projeto"
fi

echo ""

# Verificar se a rota existe
if [ -f "app/api/auth/google/route.ts" ]; then
    echo "✅ Arquivo app/api/auth/google/route.ts encontrado"
else
    echo "❌ Arquivo app/api/auth/google/route.ts NÃO encontrado!"
fi

echo ""

# Verificar se a rota de callback existe
if [ -f "app/api/auth/google/callback/route.ts" ]; then
    echo "✅ Arquivo app/api/auth/google/callback/route.ts encontrado"
else
    echo "❌ Arquivo app/api/auth/google/callback/route.ts NÃO encontrado!"
fi

echo ""

# Verificar estrutura de pastas
echo "📁 Estrutura de pastas da API:"
find app/api -name "*.ts" -type f | head -10

echo ""
echo "🔧 Para corrigir problemas:"
echo "1. Verifique se o arquivo .env.local está na raiz do projeto"
echo "2. Reinicie o servidor: npm run dev"
echo "3. Verifique o console do navegador (F12)"
echo "4. Teste a URL diretamente: http://localhost:3000/api/auth/google"
