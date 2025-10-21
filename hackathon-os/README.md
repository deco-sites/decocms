# Hackathon OS - Sistema SaaS para Organizar Hackathons

## 🎯 Visão Geral

O Hackathon OS é uma plataforma completa para organizar e gerenciar hackathons, com funcionalidades para 4 tipos de usuários:
- **Admin** - Controle total da plataforma
- **Organizador** - Cria e gerencia eventos
- **Jurados** - Avalia submissões dos times
- **Participantes** - Se inscrevem, formam times e submetem projetos

## 🧪 Modo de Teste (MVP)

Este MVP está configurado com um **seletor de usuário** no canto superior direito (caixa amarela 🧪 MODO TESTE).
Use este seletor para alternar entre diferentes perfis e testar as funcionalidades específicas de cada tipo de usuário.

### Usuários Disponíveis para Teste:

1. **👤 Não logado** - Visitante sem cadastro
2. **🔧 Admin Master** - Administrador com acesso total
3. **📋 Maria Organizadora** - Organizadora de eventos
4. **⚖️ Carlos Jurado** - Jurado de eventos
5. **👨‍💻 João Silva** - Participante (aprovado no Hackathon AI 2024)
6. **👩‍🎨 Ana Costa** - Participante (aprovada em eventos)
7. **👨‍💼 Pedro Santos** - Participante (inscrição pendente no Hackathon AI 2024)
8. **⚖️ Fernanda Lima** - Jurado

## 📁 Estrutura de Arquivos

```
/hackathon-os/
├── README.md (este arquivo)
├── data/
│   └── mockData.ts (dados mockados - usuários, eventos, times, etc)
├── islands/
│   ├── UserContext.tsx (contexto global do usuário)
│   ├── UserSelector.tsx (seletor de perfil para teste)
│   └── MainLayout.tsx (layout principal com navegação)
├── sections/
│   ├── LandingPage.tsx (landing page do SaaS)
│   ├── LandingPageComplete.tsx (landing com wrapper)
│   └── AppWrapper.tsx (wrapper com UserProvider + UserSelector)
├── eventos/
│   └── sections/
│       ├── EventsList.tsx (lista de eventos)
│       └── EventsListComplete.tsx (com wrapper)
├── notificacoes/
│   └── sections/
│       ├── NotificationsList.tsx (notificações do usuário)
│       └── NotificationsListComplete.tsx (com wrapper)
├── perfil/
│   └── sections/
│       ├── ProfilePage.tsx (página de perfil)
│       └── ProfilePageComplete.tsx (com wrapper)
├── evento/
│   └── sections/
│       ├── EventPageIntro.tsx (página completa do evento com tabs)
│       ├── EventChallenges.tsx (lista de desafios)
│       └── EventTeams.tsx (lista de times)
└── admin/
    └── sections/
        └── AdminEventCreate.tsx (formulário de criação de eventos)
```

## 🗺️ Páginas do Sistema

### 1. Landing Page (Público)
**Arquivo:** `/hackathon-os/sections/LandingPageComplete.tsx`
- Hero section com call-to-action
- Apresentação das funcionalidades
- Links para cadastro e explorar eventos

### 2. Lista de Eventos
**Arquivo:** `/hackathon-os/eventos/sections/EventsListComplete.tsx`
- **Não-logado:** Vê apenas eventos abertos
- **Logado:** Pode filtrar por: Todos, Abertos, Encerrados, Pendentes, Ativos
- **Admin/Organizador:** Botão extra para "Criar Novo Evento"
- **Participante:** Pode se inscrever, ver status de inscrição, cancelar

### 3. Notificações
**Arquivo:** `/hackathon-os/notificacoes/sections/NotificationsListComplete.tsx`
- Lista de notificações do usuário
- Tipos: Aprovação, Mensagem, Convite, Anúncio
- Marcar como lida individualmente ou todas de uma vez
- Timestamps relativos (5m atrás, 2h atrás, etc)

### 4. Perfil do Usuário
**Arquivo:** `/hackathon-os/perfil/sections/ProfilePageComplete.tsx`
- Visualizar informações do perfil
- Editar: Nome, LinkedIn, GitHub, Senioridade, Área, Bio
- Avatar com iniciais caso não tenha foto
- Badge indicando o tipo de usuário (role)

### 5. Página do Evento (com Tabs)
**Arquivo:** `/hackathon-os/evento/sections/EventPageIntro.tsx`
- **Props:** `eventId` (default: "evt1")

#### Tabs Disponíveis:
1. **📋 Intro e Regras** - Boas-vindas, regras e prazos
2. **🏆 Premiação** - Prêmios e critérios de avaliação
3. **👥 Participantes** - Lista de inscritos (conforme config de privacidade)
4. **👨‍👩‍👧‍👦 Times** - Times formados, criar time, gerenciar
5. **⚖️ Jurados** - Lista de jurados do evento
6. **🎯 Desafios** - Desafios oficiais e propostos
7. **📤 Submissões** - Projetos submetidos pelos times
8. **🥇 Classificação** - Ranking dos times
9. **🏢 Organização** - Equipe organizadora

### 6. Admin - Criar Evento
**Arquivo:** `/hackathon-os/admin/sections/AdminEventCreate.tsx`
- **Acesso:** Apenas Admin e Organizador
- Formulário completo com todas as configurações:
  - Informações básicas (nome, descrição, banner, etc)
  - Campos extras de inscrição (opcional)
  - Tamanho máximo do time
  - Prazos (inscrição, submissão, avaliação)
  - Requisitos de submissão
  - Critérios de avaliação (com pesos)
  - Configurações de desafios
  - Privacidade da lista de participantes
  - Conteúdo (intro e premiação)

## 🎮 Como Testar o Sistema

### Cenário 1: Visitante Não-Logado
1. Selecione "👤 Não logado" no seletor
2. Visite a landing page
3. Navegue para lista de eventos
4. Veja apenas eventos abertos
5. Clique em "Inscrever-se" → será redirecionado para cadastro

### Cenário 2: Participante Novo
1. Selecione "👨‍💼 Pedro Santos (Participante)"
2. Vá para lista de eventos
3. Veja que tem uma inscrição **Pendente** no Hackathon AI 2024
4. Navegue pelas notificações (tem 1 não lida)
5. Edite o perfil

### Cenário 3: Participante Aprovado
1. Selecione "👨‍💻 João Silva (Participante)"
2. Vá para lista de eventos
3. Clique em "Acessar Evento" no Hackathon AI 2024
4. Navegue pelas tabs do evento
5. Na tab **Times**, veja que ele está no time "AI Pioneers"
6. Na tab **Desafios**, veja os desafios e vote (se permitido)
7. Verifique notificações (tem 2 não lidas)

### Cenário 4: Organizador
1. Selecione "📋 Maria Organizadora"
2. Vá para lista de eventos
3. Clique em "Criar Novo Evento"
4. Preencha o formulário de criação
5. Entre em um evento existente
6. Na tab **Desafios**, veja desafios pendentes e aprove/rejeite

### Cenário 5: Admin
1. Selecione "🔧 Admin Master"
2. Acesso total a todas funcionalidades
3. Pode criar eventos
4. Pode ver todas as listas privadas
5. Pode gerenciar todos os aspectos

### Cenário 6: Jurado
1. Selecione "⚖️ Carlos Jurado"
2. Vá para um evento
3. Acesse a tab de **Submissões** para avaliar
4. Veja seu nome listado na tab **Jurados**

## 🎨 Design System

### Cores Principais
- **Purple:** `#8B5CF6` - Cor primária
- **Pink:** `#EC4899` - Cor secundária
- **Gradientes:** `from-purple-600 to-pink-600`

### Componentes
- Cards com hover effects
- Botões com transition-colors
- Badges de status coloridos
- Avatares circulares com iniciais
- Tabs com border-bottom ativo

## 📊 Dados Mockados

### Eventos Disponíveis:
1. **Hackathon AI 2024** (evt1) - Aberto, 45 inscritos
2. **GreenTech Challenge** (evt2) - Aberto, 32 inscritos
3. **FinTech Innovation** (evt3) - Encerrado, 28 inscritos

### Times Criados:
1. **AI Pioneers** - Hackathon AI 2024, Healthcare AI
2. **Green Warriors** - GreenTech Challenge, Energia Renovável

### Desafios:
- **Hackathon AI 2024:** Healthcare AI, Education AI, Acessibilidade Digital (proposto)
- **GreenTech Challenge:** Energia Renovável, Redução de Resíduos

## 🚀 Próximos Passos (Pós-MVP)

1. **Autenticação Real:** Integrar sistema de auth (Firebase, Supabase, etc)
2. **Backend:** Substituir mockData por API real
3. **Formulários de Inscrição:** Implementar campos dinâmicos
4. **Sistema de Convites:** Convidar membros para times
5. **Upload de Arquivos:** Banner, logo, submissões
6. **Sistema de Avaliação:** Jurados avaliarem com critérios
7. **Cálculo de Ranking:** Automático baseado nas avaliações
8. **Notificações em Tempo Real:** WebSocket ou polling
9. **Chat/Mensagens:** Entre organizadores e participantes
10. **Exportação de Dados:** Relatórios em PDF/Excel

## 💡 Funcionalidades Especiais

### Sistema de Inscrição Inteligente
- Se o evento não exige campos extras → inscrição automática
- Se exige → formulário customizado aparece

### Sistema de Aprovação
- Organizador aprova/rejeita inscrições
- Participante recebe notificação
- Status muda de "Pendente" para "Aprovado"

### Sistema de Times
- Apenas aprovados podem criar times
- Líder do time convida membros (por email)
- Limite de membros configurável por evento
- Times escolhem desafios

### Sistema de Desafios
- Organizador define desafios oficiais
- Participantes podem propor (se permitido)
- Votação pública ou só admin aprova (configurável)

### Sistema de Submissões
- Organizador define requisitos (vídeo, repo, PDF, etc)
- Times submetem projetos vinculados a desafios
- Visibilidade configurável

### Sistema de Avaliação
- Critérios customizáveis com pesos
- Jurados avaliam cada submissão
- Ranking calculado automaticamente

## 📝 Notas Importantes

- Todos os dados são mockados e salvos apenas no localStorage
- O sistema é 100% frontend (client-side)
- Não há persistência real entre reloads (exceto a seleção de usuário)
- Perfeito para demonstração e validação de UX/UI
- Pronto para integrar com backend real

---

**Desenvolvido para demonstração do Hackathon OS MVP** 🚀