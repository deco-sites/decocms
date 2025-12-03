# 🚀 Guia de Configuração - Hackathon OS no Admin Deco

## Passo 1: Criar as Páginas no Admin

Acesse o admin da deco e crie as seguintes páginas:

### 1️⃣ Landing Page

- **Path:** `/hackathon-os`
- **Section:** `site/hackathon-os/sections/LandingPageComplete.tsx`
- **Props:** Nenhuma prop necessária

### 2️⃣ Lista de Eventos

- **Path:** `/hackathon-os/eventos`
- **Section:** `site/hackathon-os/eventos/sections/EventsListComplete.tsx`
- **Props:** Nenhuma prop necessária

### 3️⃣ Notificações

- **Path:** `/hackathon-os/notificacoes`
- **Section:**
  `site/hackathon-os/notificacoes/sections/NotificationsListComplete.tsx`
- **Props:** Nenhuma prop necessária

### 4️⃣ Perfil

- **Path:** `/hackathon-os/perfil`
- **Section:** `site/hackathon-os/perfil/sections/ProfilePageComplete.tsx`
- **Props:** Nenhuma prop necessária

### 5️⃣ Evento - Hackathon AI 2024

- **Path:** `/hackathon-os/evento/evt1`
- **Section:** `site/hackathon-os/evento/sections/EventPageIntro.tsx`
- **Props:**
  ```json
  {
    "eventId": "evt1"
  }
  ```

### 6️⃣ Evento - GreenTech Challenge

- **Path:** `/hackathon-os/evento/evt2`
- **Section:** `site/hackathon-os/evento/sections/EventPageIntro.tsx`
- **Props:**
  ```json
  {
    "eventId": "evt2"
  }
  ```

### 7️⃣ Evento - FinTech Innovation

- **Path:** `/hackathon-os/evento/evt3`
- **Section:** `site/hackathon-os/evento/sections/EventPageIntro.tsx`
- **Props:**
  ```json
  {
    "eventId": "evt3"
  }
  ```

### 8️⃣ Admin - Criar Evento

- **Path:** `/hackathon-os/admin/evento/novo`
- **Section:** `site/hackathon-os/admin/sections/AdminEventCreate.tsx`
- **Props:** Nenhuma prop necessária

## Passo 2: Testar a Navegação

### ✅ Checklist de Testes

#### Teste como Visitante (Não-Logado)

- [ ] Acessar landing page `/hackathon-os`
- [ ] Clicar em "Explorar Eventos"
- [ ] Ver lista de eventos abertos
- [ ] Clicar em "Saiba Mais" (abre site externo)
- [ ] Tentar se inscrever → deve pedir login

#### Teste como Participante Pendente (Pedro Santos)

- [ ] Selecionar "👨‍💼 Pedro Santos" no seletor
- [ ] Ver lista de eventos
- [ ] Ver status "Pendente" no Hackathon AI 2024
- [ ] Ver notificação de inscrição pendente
- [ ] Editar perfil

#### Teste como Participante Aprovado (João Silva)

- [ ] Selecionar "👨‍💻 João Silva"
- [ ] Clicar em "Acessar Evento" no Hackathon AI 2024
- [ ] Navegar pelas 9 tabs do evento
- [ ] Ver que está no time "AI Pioneers" na tab Times
- [ ] Ver desafios na tab Desafios
- [ ] Ver submissão "MediScan AI" na tab Submissões
- [ ] Ver classificação na tab Classificação
- [ ] Conferir 2 notificações não lidas

#### Teste como Organizador (Maria Organizadora)

- [ ] Selecionar "📋 Maria Organizadora"
- [ ] Ver botão "Criar Novo Evento" na lista
- [ ] Clicar e acessar formulário `/hackathon-os/admin/evento/novo`
- [ ] Preencher formulário (todos os campos)
- [ ] Entrar em evento evt1
- [ ] Na tab Desafios, ver desafio pendente "Acessibilidade Digital"
- [ ] Aprovar desafio pendente

#### Teste como Admin (Admin Master)

- [ ] Selecionar "🔧 Admin Master"
- [ ] Acessar qualquer evento
- [ ] Ver todas as informações (mesmo se privadas)
- [ ] Criar novo evento
- [ ] Ver perfis de todos os usuários

#### Teste como Jurado (Carlos Jurado)

- [ ] Selecionar "⚖️ Carlos Jurado"
- [ ] Acessar evento evt1
- [ ] Ver seu nome na tab Jurados
- [ ] Acessar tab Submissões para avaliar

## Passo 3: Verificar Links Internos

### Links da Landing Page

- `/hackathon-os/eventos` - Lista de eventos
- `/hackathon-os/login` - (mock, pode criar depois)
- `/hackathon-os/cadastro` - (mock, pode criar depois)

### Links do Header (MainLayout)

- `/hackathon-os` - Home/Landing
- `/hackathon-os/eventos` - Lista de eventos
- `/hackathon-os/notificacoes` - Notificações
- `/hackathon-os/perfil` - Perfil do usuário
- `/hackathon-os/admin` - Painel admin (pode criar depois)
- `/hackathon-os/evento/{eventId}` - Página do evento

### Links da Lista de Eventos

- Event.url - Link externo (target="_blank")
- `/hackathon-os/evento/{eventId}/inscricao` - (mock, pode criar depois)
- `/hackathon-os/evento/{eventId}` - Página do evento
- `/hackathon-os/admin/evento/novo` - Criar evento

### Links da Página do Evento

- `/hackathon-os/eventos` - Voltar para lista
- `/hackathon-os/evento/{eventId}/criar-time` - (mock, pode criar depois)
- `/hackathon-os/evento/{eventId}/propor-desafio` - (mock, pode criar depois)
- `/hackathon-os/evento/{eventId}/submeter` - (mock, pode criar depois)
- `/hackathon-os/evento/{eventId}/time/{teamId}/editar` - (mock, pode criar
  depois)

## Passo 4: Customização Visual (Opcional)

Se quiser ajustar cores ou estilos:

1. As cores principais estão definidas nas classes Tailwind:
   - `bg-purple-500` / `bg-purple-600` - Cor primária
   - `bg-pink-500` / `bg-pink-600` - Cor secundária
   - `from-purple-600 to-pink-600` - Gradientes

2. Para mudar o tema, busque e substitua nos arquivos:
   - `purple` → sua cor preferida
   - `pink` → sua cor secundária

## Passo 5: Próximos Desenvolvimentos

### Páginas Adicionais Sugeridas (Opcional):

#### Login/Cadastro

```
Path: /hackathon-os/login
Path: /hackathon-os/cadastro
Descrição: Formulários de autenticação (atualmente mock)
```

#### Inscrição em Evento

```
Path: /hackathon-os/evento/{eventId}/inscricao
Descrição: Formulário de inscrição com campos extras
```

#### Criar Time

```
Path: /hackathon-os/evento/{eventId}/criar-time
Descrição: Formulário para criar time
```

#### Gerenciar Time

```
Path: /hackathon-os/evento/{eventId}/time/{teamId}/editar
Descrição: Convidar membros, escolher desafio
```

#### Propor Desafio

```
Path: /hackathon-os/evento/{eventId}/propor-desafio
Descrição: Formulário para propor novo desafio
```

#### Nova Submissão

```
Path: /hackathon-os/evento/{eventId}/submeter
Descrição: Formulário de submissão de projeto
```

#### Avaliar Submissão (Jurado)

```
Path: /hackathon-os/evento/{eventId}/submissao/{submissionId}/avaliar
Descrição: Formulário de avaliação com critérios
```

#### Painel Admin

```
Path: /hackathon-os/admin
Descrição: Dashboard com métricas e gestão
```

## 🎯 Dicas Importantes

### Seletor de Usuário (Modo Teste)

- O seletor amarelo **sempre aparece** no canto superior direito
- Use para trocar entre perfis sem recarregar a página
- A seleção é salva no localStorage
- Para produção, remova o `<UserSelector />` do AppWrapper

### LocalStorage

O sistema usa localStorage para:

- Armazenar o usuário selecionado
- Chave: `hackathon-os-user`
- Formato: JSON do objeto User

### Mock Data

- Todos os dados estão em `/hackathon-os/data/mockData.ts`
- Para adicionar eventos, edite o array `mockEvents`
- Para adicionar usuários, edite o array `mockUsers`
- Para adicionar times, edite o array `mockTeams`

### Estrutura de Rotas

```
/hackathon-os                           → Landing
/hackathon-os/eventos                   → Lista
/hackathon-os/notificacoes              → Notificações
/hackathon-os/perfil                    → Perfil
/hackathon-os/evento/[eventId]          → Evento específico
/hackathon-os/admin/evento/novo         → Criar evento
```

## 🐛 Troubleshooting

### Problema: Seletor não aparece

**Solução:** Verifique se a section usa `LandingPageComplete`,
`EventsListComplete`, etc (com "Complete" no final)

### Problema: Dados não aparecem

**Solução:** Verifique se importou corretamente de `../data/mockData.ts`

### Problema: Links quebrados

**Solução:** Confira se criou todas as 8 páginas principais listadas no Passo 1

### Problema: Tabs não funcionam no EventPageIntro

**Solução:** Verifique se o `eventId` está sendo passado corretamente nas props

### Problema: Botões não funcionam

**Solução:** Alguns botões são mock e apenas dão `alert()`. Para implementar,
crie as páginas correspondentes

## ✅ Validação Final

Depois de configurar tudo, você deve conseguir:

1. ✅ Navegar entre todas as páginas sem erros 404
2. ✅ Trocar de usuário no seletor e ver mudanças
3. ✅ Ver diferentes conteúdos baseado no tipo de usuário
4. ✅ Filtrar eventos quando logado
5. ✅ Ver notificações de cada usuário
6. ✅ Editar perfil
7. ✅ Navegar pelas 9 tabs de um evento
8. ✅ Preencher formulário de criar evento (admin)

---

**🎉 Parabéns!** Seu Hackathon OS está pronto para demonstração!

Para qualquer dúvida, consulte:

- `README.md` - Documentação completa
- `INDEX.md` - Índice de todas as páginas
- `mockData.ts` - Estrutura de dados
