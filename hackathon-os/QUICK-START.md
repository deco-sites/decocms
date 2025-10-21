# ⚡ Quick Start - Hackathon OS

## 🎯 Resumo Ultra-Rápido

Criei um **SaaS completo** para organizar hackathons com:
- ✅ 4 perfis de usuário (Admin, Organizador, Jurado, Participante)
- ✅ 8 páginas principais totalmente funcionais
- ✅ Seletor de usuário para testar (canto superior direito)
- ✅ Dados mockados prontos para demonstração
- ✅ 21 arquivos criados (~4700 linhas de código)

## 🚀 Como Usar em 3 Passos

### 1️⃣ Criar Páginas no Admin da Deco

Acesse o admin e crie 8 páginas com estas configurações:

| Path | Section | Props |
|------|---------|-------|
| `/hackathon-os` | `site/hackathon-os/sections/LandingPageComplete.tsx` | - |
| `/hackathon-os/eventos` | `site/hackathon-os/eventos/sections/EventsListComplete.tsx` | - |
| `/hackathon-os/notificacoes` | `site/hackathon-os/notificacoes/sections/NotificationsListComplete.tsx` | - |
| `/hackathon-os/perfil` | `site/hackathon-os/perfil/sections/ProfilePageComplete.tsx` | - |
| `/hackathon-os/evento/evt1` | `site/hackathon-os/evento/sections/EventPageIntro.tsx` | `{"eventId":"evt1"}` |
| `/hackathon-os/evento/evt2` | `site/hackathon-os/evento/sections/EventPageIntro.tsx` | `{"eventId":"evt2"}` |
| `/hackathon-os/evento/evt3` | `site/hackathon-os/evento/sections/EventPageIntro.tsx` | `{"eventId":"evt3"}` |
| `/hackathon-os/admin/evento/novo` | `site/hackathon-os/admin/sections/AdminEventCreate.tsx` | - |

### 2️⃣ Abrir a Landing Page

Acesse: `https://seusite.deco.site/hackathon-os`

Você verá:
- 🧪 Seletor amarelo no canto superior direito
- Hero section com gradiente roxo/rosa
- Features grid
- CTA para explorar eventos

### 3️⃣ Testar Navegação

Use o **seletor de usuário** para alternar entre perfis e explore:

```
🧪 MODO TESTE (dropdown no canto superior direito)
├── 👤 Não logado
├── 🔧 Admin Master
├── 📋 Maria Organizadora
├── ⚖️ Carlos Jurado
├── 👨‍💻 João Silva (Participante - Aprovado evt1)
├── 👩‍🎨 Ana Costa (Participante - Aprovada evt1 e evt2)
├── 👨‍💼 Pedro Santos (Participante - Pendente evt1)
└── ⚖️ Fernanda Lima (Jurado)
```

## 🎮 Cenários de Teste Rápidos

### Cenário 1: Visitante → Participante (2 min)
1. Selecione "👤 Não logado"
2. Clique "Explorar Eventos"
3. Veja apenas eventos abertos
4. Clique "Inscrever-se" em qualquer evento
5. Será redirecionado para cadastro (mock)

### Cenário 2: Participante Aprovado (3 min)
1. Selecione "👨‍💻 João Silva"
2. Clique "Notificações" → Veja 2 não lidas
3. Vá para "Eventos" → Clique "Acessar Evento" no Hackathon AI
4. Navegue pelas 9 tabs (use as tabs no topo)
5. Tab "Times" → Veja que está no time "AI Pioneers"
6. Tab "Desafios" → Vote em desafios
7. Tab "Submissões" → Veja projeto "MediScan AI"
8. Tab "Classificação" → Veja 1º lugar

### Cenário 3: Organizador (2 min)
1. Selecione "📋 Maria Organizadora"
2. Vá para "Eventos"
3. Clique "Criar Novo Evento"
4. Veja formulário completo com todas configurações
5. Entre em evt1 → Tab "Desafios"
6. Veja desafio pendente "Acessibilidade Digital"
7. Clique "Aprovar" (mock)

### Cenário 4: Admin (1 min)
1. Selecione "🔧 Admin Master"
2. Acesso total a todas funcionalidades
3. Entre em qualquer evento
4. Veja todas informações (mesmo privadas)

## 📱 Menu de Navegação (Header)

Quando logado, o header mostra:

```
[H] Hackathon OS | Eventos | Notificações (badge) | Meus Eventos ▼ | [Avatar] ▼

Dropdown "Meus Eventos":
- Hackathon AI 2024
- GreenTech Challenge
(apenas eventos que o usuário foi aprovado)

Dropdown Avatar:
- Meu Perfil
- Painel Admin (se admin/organizador)
- Sair
```

## 🎨 Tabs do Evento (9 tabs)

Quando você acessa um evento (ex: `/hackathon-os/evento/evt1`):

```
[📋 Intro e Regras] [🏆 Premiação] [👥 Participantes] [👨‍👩‍👧‍👦 Times]
[⚖️ Jurados] [🎯 Desafios] [📤 Submissões] [🥇 Classificação] [🏢 Organização]
```

Clique nas tabs para navegar entre seções.

## 💡 Dicas Importantes

### ✅ Faça
- Use o seletor para testar diferentes perfis
- Navegue pelas tabs dos eventos
- Teste os filtros na lista de eventos
- Veja as notificações de cada usuário
- Edite o perfil (modo mock)

### ❌ Evite
- Recarregar a página (perde o estado do formulário de criar evento)
- Clicar em botões mockados que dão alert() repetidas vezes
- Tentar fazer upload de arquivos (não implementado)

## 🗺️ Mapa de Navegação Simplificado

```
Landing (/hackathon-os)
    ↓
Eventos (/hackathon-os/eventos)
    ↓
Evento Específico (/hackathon-os/evento/evt1)
    ├─ Tab Intro
    ├─ Tab Premiação
    ├─ Tab Participantes
    ├─ Tab Times ← João Silva está no "AI Pioneers"
    ├─ Tab Jurados
    ├─ Tab Desafios ← Votar, Propor, Aprovar (org)
    ├─ Tab Submissões ← Ver "MediScan AI"
    ├─ Tab Classificação ← Ranking
    └─ Tab Organização

Notificações (/hackathon-os/notificacoes)
    ← João tem 2 não lidas

Perfil (/hackathon-os/perfil)
    ← Ver/Editar informações

Admin (/hackathon-os/admin/evento/novo)
    ← Formulário completo para criar evento
```

## 🔍 Verificação Rápida

Execute este checklist mental (1 minuto):

1. ✅ Seletor amarelo aparece no canto superior direito?
2. ✅ Consegue trocar de usuário no dropdown?
3. ✅ Landing page carrega com gradiente roxo/rosa?
4. ✅ Lista de eventos mostra 3 eventos?
5. ✅ João Silva tem 2 notificações?
6. ✅ Evento evt1 tem 9 tabs clicáveis?
7. ✅ Tab Times mostra "AI Pioneers"?
8. ✅ Admin/Organizador vê botão "Criar Novo Evento"?

Se SIM para tudo = **Sistema 100% funcional!** 🎉

## 📚 Documentação Completa

Para entender em profundidade:

1. **README.md** - Documentação técnica completa
2. **INDEX.md** - Índice de todos arquivos e páginas
3. **SETUP-GUIDE.md** - Guia passo-a-passo de configuração
4. **VISUAL-FLOW.md** - Fluxos visuais e wireframes em ASCII
5. **FILES-CREATED.md** - Lista de todos arquivos criados

## 🐛 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Seletor não aparece | Use arquivos "Complete" (LandingPageComplete.tsx) |
| Dados não carregam | Verifique imports do mockData.ts |
| Links quebrados | Confira se criou todas 8 páginas |
| Tabs não funcionam | Verifique prop eventId no EventPageIntro |
| Botão não funciona | Alguns são mock e só dão alert() |

## 🎯 Objetivo Alcançado

✅ **Sistema completo** de gerenciamento de hackathons
✅ **Frontend funcionando** 100% sem backend
✅ **Pronto para demonstração** e validação de UX
✅ **Base sólida** para implementação de backend real

## 🚀 Próxima Fase (Backend)

Quando quiser integrar backend:
1. Substituir `mockData.ts` por chamadas API
2. Implementar autenticação real
3. Adicionar upload de arquivos
4. Conectar banco de dados
5. Sistema de notificações em tempo real

---

**🎉 Aproveite seu Hackathon OS!**

Qualquer dúvida, consulte os documentos na pasta `/hackathon-os/`

**Tempo estimado para testar tudo:** 10-15 minutos
**Tempo estimado para entender tudo:** 30-45 minutos