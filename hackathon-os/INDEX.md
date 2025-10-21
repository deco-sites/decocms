# 📋 Índice de Páginas - Hackathon OS

## 🏠 Páginas Principais (Para Adicionar no Admin da Deco)

### 1. Landing Page
```
Path: /hackathon-os
Section: site/hackathon-os/sections/LandingPageComplete.tsx
Descrição: Página inicial do SaaS Hackathon OS
Acesso: Público
```

### 2. Lista de Eventos
```
Path: /hackathon-os/eventos
Section: site/hackathon-os/eventos/sections/EventsListComplete.tsx
Descrição: Lista de todos os hackathons disponíveis
Acesso: Público (limitado se não-logado)
Features:
  - Filtros: Todos, Abertos, Encerrados, Pendentes, Ativos
  - Inscrição em eventos
  - Botão "Criar Evento" (admin/organizador)
```

### 3. Notificações
```
Path: /hackathon-os/notificacoes
Section: site/hackathon-os/notificacoes/sections/NotificationsListComplete.tsx
Descrição: Central de notificações do usuário
Acesso: Requer login
Features:
  - Lista de notificações
  - Marcar como lida
  - Tipos: Aprovação, Mensagem, Convite, Anúncio
```

### 4. Perfil do Usuário
```
Path: /hackathon-os/perfil
Section: site/hackathon-os/perfil/sections/ProfilePageComplete.tsx
Descrição: Página de perfil do usuário
Acesso: Requer login
Features:
  - Visualizar informações
  - Editar perfil (nome, linkedin, github, senioridade, área, bio)
  - Avatar com iniciais
```

### 5. Página do Evento (Hackathon AI 2024)
```
Path: /hackathon-os/evento/evt1
Section: site/hackathon-os/evento/sections/EventPageIntro.tsx
Props: { eventId: "evt1" }
Descrição: Página completa do evento com 9 tabs
Acesso: Requer login e aprovação no evento
Tabs:
  1. 📋 Intro e Regras
  2. 🏆 Premiação
  3. 👥 Participantes
  4. 👨‍👩‍👧‍👦 Times
  5. ⚖️ Jurados
  6. 🎯 Desafios
  7. 📤 Submissões
  8. 🥇 Classificação
  9. 🏢 Organização
```

### 6. Página do Evento (GreenTech Challenge)
```
Path: /hackathon-os/evento/evt2
Section: site/hackathon-os/evento/sections/EventPageIntro.tsx
Props: { eventId: "evt2" }
Descrição: Página completa do evento GreenTech
Acesso: Requer login e aprovação no evento
```

### 7. Página do Evento (FinTech Innovation)
```
Path: /hackathon-os/evento/evt3
Section: site/hackathon-os/evento/sections/EventPageIntro.tsx
Props: { eventId: "evt3" }
Descrição: Página completa do evento FinTech (Encerrado)
Acesso: Requer login e aprovação no evento
```

### 8. Admin - Criar Evento
```
Path: /hackathon-os/admin/evento/novo
Section: site/hackathon-os/admin/sections/AdminEventCreate.tsx
Descrição: Formulário para criar novo evento
Acesso: Apenas Admin e Organizador
Features:
  - Configuração completa do evento
  - Informações básicas
  - Inscrição (campos extras opcionais)
  - Times (tamanho máximo)
  - Prazos
  - Requisitos de submissão
  - Critérios de avaliação
  - Desafios (configurações)
  - Privacidade
  - Conteúdo (intro e premiação)
```

## 🗂️ Arquivos de Suporte

### Data/Mock
```
File: /hackathon-os/data/mockData.ts
Conteúdo:
  - Interfaces TypeScript (User, Event, Team, Challenge, Submission, Notification, Registration)
  - Mock de 7 usuários (admin, organizador, 2 jurados, 3 participantes)
  - Mock de 3 eventos (AI, GreenTech, FinTech)
  - Mock de times, desafios, submissões
  - Helper functions (getUserById, getEventById, etc)
```

### Context/Islands
```
File: /hackathon-os/islands/UserContext.tsx
Descrição: Context API para gerenciar usuário logado
Features:
  - Estado global do usuário
  - Persistência no localStorage
  - Helper hook useUser()
```

```
File: /hackathon-os/islands/UserSelector.tsx
Descrição: Dropdown para selecionar perfil de teste (MVP)
Features:
  - Seletor fixo no canto superior direito
  - Badge amarela "🧪 MODO TESTE"
  - 8 opções de usuário + não-logado
```

```
File: /hackathon-os/islands/MainLayout.tsx
Descrição: Layout principal com header e navegação
Features:
  - Header responsivo
  - Menu desktop e mobile
  - Notificações com badge de contador
  - Dropdown de eventos aprovados
  - Dropdown de perfil com logout
```

### Sections/Components
```
File: /hackathon-os/sections/AppWrapper.tsx
Descrição: Wrapper que combina UserProvider + UserSelector + MainLayout
Uso: Envolver todas as páginas do sistema
```

```
File: /hackathon-os/sections/LandingPage.tsx
Descrição: Landing page pura (sem wrapper)
Features:
  - Hero section
  - Features grid
  - CTA section
  - Footer
```

```
File: /hackathon-os/evento/sections/EventChallenges.tsx
Descrição: Componente de lista de desafios de um evento
Props: { eventId: string }
Features:
  - Desafios oficiais (aprovados)
  - Desafios propostos (pendentes)
  - Votação (se permitido)
  - Aprovação (admin/organizador)
```

```
File: /hackathon-os/evento/sections/EventTeams.tsx
Descrição: Componente de lista de times de um evento
Props: { eventId: string }
Features:
  - Lista de times formados
  - Membros de cada time
  - Indicador de líder
  - Botão "Criar Time" (se não tiver time)
  - Link "Gerenciar Time" (se for líder)
```

## 🎯 Fluxo de Navegação Recomendado

### Fluxo 1: Visitante → Participante Aprovado
1. Landing Page (`/hackathon-os`)
2. Ver eventos (`/hackathon-os/eventos`)
3. Clicar "Inscrever-se" → Cadastro (mock: selecionar usuário)
4. Voltar para eventos → Ver status "Pendente"
5. Organizador aprova (trocar para organizador no seletor)
6. Voltar para participante → Ver notificação de aprovação
7. Acessar evento (`/hackathon-os/evento/evt1`)
8. Navegar pelas tabs
9. Criar time na tab Times
10. Ver desafios e votar
11. Submeter projeto

### Fluxo 2: Organizador Cria Evento
1. Selecionar "📋 Maria Organizadora"
2. Ir para eventos (`/hackathon-os/eventos`)
3. Clicar "Criar Novo Evento"
4. Preencher formulário (`/hackathon-os/admin/evento/novo`)
5. Criar evento
6. Gerenciar inscrições pendentes
7. Aprovar desafios propostos

### Fluxo 3: Admin Oversight
1. Selecionar "🔧 Admin Master"
2. Ver todos os eventos
3. Acessar qualquer evento
4. Ver todas as informações (mesmo privadas)
5. Criar novos eventos
6. Gerenciar usuários (editar perfis)

## 📊 Dados de Teste Importantes

### Usuários e suas Inscrições:
- **João Silva (id: 4):** Aprovado no evt1 (Hackathon AI), Pendente no evt2 (GreenTech)
- **Ana Costa (id: 5):** Aprovada no evt1 e evt2
- **Pedro Santos (id: 6):** Pendente no evt1

### Times Criados:
- **AI Pioneers:** João Silva (líder) + Ana Costa | Evento: evt1 | Desafio: Healthcare AI
- **Green Warriors:** Ana Costa (líder) | Evento: evt2 | Desafio: Energia Renovável

### Submissões:
- **MediScan AI:** Time AI Pioneers | Evento evt1 | Score: 85

## 🎨 Customização Futura

### Para adicionar novo tipo de página:
1. Criar section em `/hackathon-os/[pasta]/sections/[NomePage].tsx`
2. Criar wrapper em `/hackathon-os/[pasta]/sections/[NomePage]Complete.tsx`
3. Usar `AppWrapper` com `currentPage` apropriado
4. Adicionar rota no admin da deco

### Para adicionar nova funcionalidade:
1. Adicionar dados em `/hackathon-os/data/mockData.ts`
2. Criar componente/section
3. Integrar com UserContext se necessário
4. Adicionar permissões baseadas em `currentUser.role`

---

**Total de Páginas Criadas:** 8 principais + componentes auxiliares
**Total de Arquivos:** 18 arquivos TypeScript/TSX
**Linhas de Código:** ~3.500+ linhas

🚀 Sistema completo e navegável para demonstração do Hackathon OS!