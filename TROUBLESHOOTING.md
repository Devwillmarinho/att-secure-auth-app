# 🔧 Guia de Solução de Problemas

## Erro: Module not found 'bcrypt'

### Problema
O módulo `bcrypt` não é compatível com o Edge Runtime do Next.js e pode causar problemas de build.

### Solução
Substituímos `bcrypt` por `bcryptjs`, que é uma implementação JavaScript pura e mais compatível.

### Passos para corrigir:

1. **Remover bcrypt e instalar bcryptjs:**
\`\`\`bash
npm uninstall bcrypt @types/bcrypt
npm install bcryptjs @types/bcryptjs
\`\`\`

2. **Atualizar imports nos arquivos:**
\`\`\`typescript
// Antes
import bcrypt from "bcrypt"

// Depois  
import bcrypt from "bcryptjs"
\`\`\`

3. **Limpar cache e reinstalar:**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

## Outros Problemas Comuns

### 1. Erro de CORS no Google OAuth
**Solução:** Verificar se as URLs de redirecionamento estão corretas no Google Cloud Console.

### 2. Variáveis de ambiente não carregam
**Solução:** Certificar-se de que o arquivo `.env.local` está na raiz do projeto e reiniciar o servidor.

### 3. Sessões não persistem
**Solução:** Verificar se os cookies estão sendo definidos corretamente e se o domínio está correto.

### 4. Build falha em produção
**Solução:** Usar `bcryptjs` em vez de `bcrypt` e verificar se todas as dependências estão no `package.json`.

## Comandos Úteis

\`\`\`bash
# Limpar cache do Next.js
rm -rf .next

# Reinstalar dependências
rm -rf node_modules package-lock.json && npm install

# Verificar dependências
npm list

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build
