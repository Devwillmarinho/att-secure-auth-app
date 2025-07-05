#!/bin/bash

echo "🚀 Instalando dependências..."

# Remover node_modules e package-lock.json se existirem
rm -rf node_modules package-lock.json

# Instalar dependências
npm install

echo "✅ Dependências instaladas com sucesso!"
echo ""
echo "📦 Dependências principais instaladas:"
echo "  - bcryptjs (substituto do bcrypt para melhor compatibilidade)"
echo "  - @types/bcryptjs (tipos TypeScript)"
echo ""
echo "🔧 Para executar o projeto:"
echo "  npm run dev"
