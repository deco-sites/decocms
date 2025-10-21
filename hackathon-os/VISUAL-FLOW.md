# 🎨 Fluxo Visual - Hackathon OS

## 🗺️ Mapa de Navegação

```
┌─────────────────────────────────────────────────────────────────┐
│                    🧪 SELETOR DE USUÁRIO                        │
│              (Fixo no canto superior direito)                   │
│   👤 Não logado | 🔧 Admin | 📋 Organizador | ⚖️ Jurado        │
│              👨‍💻 João | 👩‍🎨 Ana | 👨‍💼 Pedro                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     LANDING PAGE                                │
│                   /hackathon-os                                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Hero Section                                             │ │
│  │  "Organize Hackathons de Forma Simples"                  │ │
│  │  [Explorar Eventos] [Criar Conta]                        │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                          │
│  │ Gestão  │ │Desafios │ │Sistema  │                          │
│  │ de Times│ │         │ │Avaliação│                          │
│  └─────────┘ └─────────┘ └─────────┘                          │
│                                                                 │
│             [Começar Agora]                                     │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ↓
┌─────────────────────────────────────────────────────────────────┐
│                   LISTA DE EVENTOS                              │
│              /hackathon-os/eventos                              │
│                                                                 │
│  Filtros (se logado):                                           │
│  [Todos] [Abertos] [Encerrados] [Pendentes] [Ativos]          │
│                                                                 │
│  [+ Criar Novo Evento] ← (Admin/Organizador)                   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ 🎯 Hackathon AI 2024           [Aberto]    45 inscritos │  │
│  │ Desenvolva soluções com IA...                           │  │
│  │ [Saiba Mais] [Inscrever-se / Pendente / Acessar]       │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ 🌱 GreenTech Challenge        [Aberto]     32 inscritos │  │
│  │ Tecnologias sustentáveis...                             │  │
│  │ [Saiba Mais] [Inscrever-se]                             │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ↓ (Clicar "Acessar Evento")
┌─────────────────────────────────────────────────────────────────┐
│                 PÁGINA DO EVENTO                                │
│          /hackathon-os/evento/evt1                              │
│                                                                 │
│  ← Voltar | Hackathon AI 2024                                  │
│  Desenvolva soluções inovadoras usando IA...                   │
│                                                                 │
│  [📋 Intro] [🏆 Premiação] [👥 Participantes] [👨‍👩‍👧‍👦 Times]    │
│  [⚖️ Jurados] [🎯 Desafios] [📤 Submissões] [🥇 Classificação]  │
│  [🏢 Organização]                                               │
│  ═══════════════════════════════════════════════════════════   │
│                                                                 │
│  TAB: INTRO E REGRAS                                            │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Bem-vindo ao Hackathon AI 2024!                           │ │
│  │                                                            │ │
│  │ Regras do Evento:                                         │ │
│  │ • Times de até 5 pessoas                                  │ │
│  │ • Prazo de inscrição: 15/03/2024                         │ │
│  │ • Prazo de submissão: 01/04/2024                         │ │
│  │ • Projetos devem ser originais...                        │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ↓ (Navegar para tab Times)
┌─────────────────────────────────────────────────────────────────┐
│  TAB: TIMES                          [Criar Meu Time]           │
│  ═══════════════════════════════════════════════════════════   │
│                                                                 │
│  ┌─────────────────────────────────┐  ┌────────────────────┐  │
│  │ [Seu Time]                      │  │ Green Warriors     │  │
│  │ AI Pioneers                     │  │                    │  │
│  │ Time focado em IA para saúde   │  │ Time sustentável   │  │
│  │                                 │  │                    │  │
│  │ Membros (2/5):                  │  │ Membros (1/5):     │  │
│  │ • João Silva 👑 Líder           │  │ • Ana Costa 👑     │  │
│  │ • Ana Costa (Desenvolvedor)     │  │                    │  │
│  │                                 │  │ Desafio:           │  │
│  │ Desafio: Healthcare AI          │  │ Energia Renovável  │  │
│  │                                 │  │                    │  │
│  │ [Gerenciar Time →]              │  │                    │  │
│  └─────────────────────────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ↓ (Navegar para tab Desafios)
┌─────────────────────────────────────────────────────────────────┐
│  TAB: DESAFIOS                      [💡 Propor Novo Desafio]    │
│  ═══════════════════════════════════════════════════════════   │
│                                                                 │
│  Desafios Oficiais:                                             │
│                                                                 │
│  ┌───────────────────────┐  ┌───────────────────────┐         │
│  │ Healthcare AI         │  │ Education AI          │         │
│  │ Desenvolva IA para    │  │ Ferramentas de IA     │         │
│  │ diagnóstico médico... │  │ para aprendizado...   │         │
│  │ 👍 15 votos  [Votar]  │  │ 👍 12 votos  [Votar]  │         │
│  └───────────────────────┘  └───────────────────────┘         │
│                                                                 │
│  Desafios Propostos (Pendentes) ← Admin/Organizador vê         │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Acessibilidade Digital                                  │  │
│  │ Use IA para tornar a internet mais acessível...        │  │
│  │ Proposto por participante                               │  │
│  │                              [Aprovar] [Rejeitar]       │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ↓ (Navegar para tab Submissões)
┌─────────────────────────────────────────────────────────────────┐
│  TAB: SUBMISSÕES                    [Nova Submissão]            │
│  ═══════════════════════════════════════════════════════════   │
│                                                                 │
│  Requisitos para Submissão:                                     │
│  • Video do YouTube                                             │
│  • Repositório GitHub                                           │
│  • Nome e descrição do projeto                                 │
│  • PDF da apresentação                                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ MediScan AI                          [Submetido]        │  │
│  │ Time: AI Pioneers                                        │  │
│  │ Sistema de IA para análise de exames médicos...         │  │
│  │ 📺 Vídeo | 💻 GitHub | 📄 Apresentação                   │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ↓ (Navegar para tab Classificação)
┌─────────────────────────────────────────────────────────────────┐
│  TAB: CLASSIFICAÇÃO                                             │
│  ═══════════════════════════════════════════════════════════   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ 🥇  AI Pioneers                                    95   │  │
│  │     MediScan AI                                  pontos │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ 🥈  Code Warriors                                  88   │  │
│  │     SmartLearn                                   pontos │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ 🥉  Tech Innovators                                82   │  │
│  │     AccessAI                                     pontos │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      HEADER (MainLayout)                        │
│  Sempre presente em todas as páginas logadas                    │
│                                                                 │
│  [H] Hackathon OS  |  Eventos  |  Notificações (2) ↓           │
│                     Meus Eventos ↓  |  [JS] ↓                   │
│                                                                 │
│  Dropdown "Meus Eventos":                                       │
│  • Hackathon AI 2024                                            │
│  • GreenTech Challenge                                          │
│                                                                 │
│  Dropdown Perfil [JS]:                                          │
│  • Meu Perfil                                                   │
│  • Painel Admin (se admin/org)                                 │
│  • Sair                                                         │
└───────────────────────────────────────��─────────────────────────┘
                        │
                        ↓ (Clicar em "Notificações")
┌─────────────────────────────────────────────────────────────────┐
│                     NOTIFICAÇÕES                                │
│              /hackathon-os/notificacoes                         │
│                                                                 │
│  Notificações                    2 não lidas                    │
│                              [Marcar todas como lidas]          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ ✅ Inscrição Aprovada! 🎉                        5m atrás│  │
│  │ Sua inscrição no Hackathon AI 2024 foi aprovada!       │  │
│  │                                [Marcar como lida]       │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ 📨 Convite para Time                            2h atrás│  │
│  │ João Silva convidou você para o time AI Pioneers       │  │
│  │                                [Marcar como lida]       │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ 📢 Novo Desafio Disponível                      1d atrás│  │
│  │ Um novo desafio foi adicionado: Education AI            │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ↓ (Clicar em "Meu Perfil")
┌─────────────────────────────────────────────────────────────────┐
│                       MEU PERFIL                                │
│                /hackathon-os/perfil                             │
│                                                                 │
│  Meu Perfil                                                     │
│  Gerencie suas informações pessoais                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  [JS]  João Silva                    [Editar Perfil]    │  │
│  │        joao@email.com                                    │  │
│  │        [participante]                                    │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │  LinkedIn: linkedin.com/in/joaosilva                    │  │
│  │  GitHub: github.com/joaosilva                           │  │
│  │  Senioridade: Junior                                    │  │
│  │  Área: Desenvolvedor                                    │  │
│  │  Bio: Desenvolvedor fullstack apaixonado por inovação   │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│               ADMIN - CRIAR EVENTO                              │
│         /hackathon-os/admin/evento/novo                         │
│         (Apenas Admin e Organizador)                            │
│                                                                 │
│  ← Voltar para eventos                                          │
│  Criar Novo Evento                                              │
│  Configure todos os detalhes do seu hackathon                  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Informações Básicas                                      │  │
│  │ Nome do Evento: [____________________________]           │  │
│  │ Descrição: [_________________________________]           │  │
│  │ URL do Banner: [____________________________]            │  │
│  │ Site: [_____________________________________]            │  │
│  │ Status: [Aberto ▼]                                       │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Configurações de Inscrição                               │  │
│  │ ☑ Exigir campos adicionais (máx 3)                      │  │
│  │   Pergunta 1: [_______________________________]         │  │
│  │   Pergunta 2: [_______________________________]         │  │
│  │   Pergunta 3: [_______________________________]         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Configurações de Times                                   │  │
│  │ Tamanho Máximo: [5___]                                   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Prazos                                                   │  │
│  │ Inscrição: [15/03/2024]  Submissão: [01/04/2024]       │  │
│  │ Avaliação: [05/04/2024]                                 │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Requisitos de Submissão                                  │  │
│  │ [Video do YouTube____________________] [Adicionar]      │  │
│  │ • Video do YouTube                              [x]     │  │
│  │ • Repositório GitHub                            [x]     │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Critérios de Avaliação                                   │  │
│  │ [Inovação___________________] [30__]%                   │  │
│  │ [Execução Técnica___________] [30__]%                   │  │
│  │ [Impacto____________________] [25__]%                   │  │
│  │ [Apresentação_______________] [15__]%                   │  │
│  │ Total: 100%                                              │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Configurações de Desafios                                │  │
│  │ ☑ Permitir participantes propor desafios                │  │
│  │ ☐ Votação pública nos desafios propostos                │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Conteúdo                                                 │  │
│  │ Introdução: [_________________________________]         │  │
│  │ Premiação: [__________________________________]          │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│              [Criar Evento]  [Cancelar]                         │
└─────────────────────────────────────────────────────────────────┘
```

## 🎭 Personas e Jornadas

### 👤 Visitante (Não-logado)
```
Landing → Explorar Eventos → Ver lista (só abertos) → Tentar inscrever → Redirecionar p/ cadastro
```

### 👨‍💻 Participante Novo (Pedro Santos)
```
Login → Lista de Eventos → Inscrever em Hackathon AI → Status: Pendente
→ Ver Notificação "Inscrição Pendente"
→ Aguardar aprovação
```

### 👨‍💻 Participante Aprovado (João Silva)
```
Login → Ver notificação "Aprovado!" → Lista de Eventos → "Acessar Evento"
→ Navegar tabs → Times (já está em "AI Pioneers")
→ Desafios (votar) → Submissões (enviar projeto)
→ Classificação (ver ranking)
```

### 📋 Organizador (Maria)
```
Login → Lista de Eventos → "Criar Novo Evento"
→ Preencher formulário completo → Criar
→ Entrar no evento → Gerenciar inscrições pendentes
→ Tab Desafios → Aprovar desafios propostos
→ Tab Submissões → Acompanhar projetos
```

### 🔧 Admin (Admin Master)
```
Login → Acesso total a tudo
→ Criar eventos → Ver listas privadas
→ Editar perfis de usuários → Gerenciar plataforma
```

### ⚖️ Jurado (Carlos/Fernanda)
```
Login → Ver eventos onde é jurado
→ Entrar no evento → Tab Submissões
→ Avaliar projetos com critérios definidos
→ Tab Classificação (ranking gerado automaticamente)
```

## 🎨 Paleta de Cores

```
Primary Purple:   #8B5CF6  ████
Secondary Pink:   #EC4899  ████
Gradient:         Purple → Pink

Status Colors:
✅ Aprovado:      #10B981  ████ (Green)
⏳ Pendente:      #F59E0B  ████ (Yellow)
❌ Encerrado:     #6B7280  ████ (Gray)
🔴 Recusado:      #EF4444  ████ (Red)
```

## 📱 Responsividade

```
Mobile (<768px):
- Menu hamburger
- Cards em coluna única
- Tabs scrolláveis horizontalmente

Tablet (768px-1024px):
- Grid de 2 colunas para cards
- Menu dropdown

Desktop (>1024px):
- Grid de 3 colunas para cards
- Menu completo no header
- Sidebar (futuro)
```

---

**🎉 Sistema Completo e Navegável!**
Use este guia visual para entender o fluxo e apresentar o sistema.