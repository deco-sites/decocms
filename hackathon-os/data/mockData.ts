// Mock Data para Hackathon OS

export interface User {
  id: string;
  email: string;
  name: string;
  photo?: string;
  linkedin?: string;
  github?: string;
  seniority: "estudante" | "estagio" | "junior" | "senior" | "staff";
  area:
    | "designer"
    | "arquiteto"
    | "desenvolvedor"
    | "dados"
    | "growth"
    | "outros";
  bio?: string;
  role: "admin" | "organizador" | "jurado" | "participante";
}

export interface Event {
  id: string;
  name: string;
  description: string;
  banner: string;
  registrations: number;
  status: "aberto" | "encerrado";
  url: string;
  organizerId: string;
  config: EventConfig;
  intro?: string;
  awards?: string;
}

export interface EventConfig {
  requiresExtraFields: boolean;
  extraFields?: string[];
  participantsListPublic: boolean;
  evaluationCriteria: { name: string; weight: number }[];
  allowUserChallenges: boolean;
  challengesVotingPublic: boolean;
  deadlines: {
    registration: string;
    submission: string;
    evaluation: string;
  };
  submissionRequirements: string[];
  maxTeamSize: number;
}

export interface Team {
  id: string;
  eventId: string;
  name: string;
  description: string;
  leaderId: string;
  memberIds: string[];
  challengeId?: string;
}

export interface Challenge {
  id: string;
  eventId: string;
  name: string;
  description: string;
  proposedBy?: string;
  approved: boolean;
  votes: number;
}

export interface Submission {
  id: string;
  eventId: string;
  teamId: string;
  challengeId: string;
  projectName: string;
  description: string;
  youtubeUrl?: string;
  githubRepo?: string;
  pdfUrl?: string;
  submittedAt: string;
  score?: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "approval" | "message" | "invitation" | "announcement";
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  status: "pendente" | "aprovado" | "recusado";
  extraData?: Record<string, string>;
}

// MOCK USERS
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@hackathonos.com",
    name: "Admin Master",
    photo: undefined,
    linkedin: "linkedin.com/in/adminmaster",
    github: "github.com/adminmaster",
    seniority: "staff",
    area: "desenvolvedor",
    bio: "Administrador da plataforma",
    role: "admin",
  },
  {
    id: "2",
    email: "org1@hackathonos.com",
    name: "Maria Organizadora",
    photo: undefined,
    linkedin: "linkedin.com/in/mariaorg",
    github: "github.com/mariaorg",
    seniority: "senior",
    area: "growth",
    bio: "Organizadora de eventos tech há 5 anos",
    role: "organizador",
  },
  {
    id: "3",
    email: "jurado1@hackathonos.com",
    name: "Carlos Jurado",
    photo: undefined,
    linkedin: "linkedin.com/in/carlosjurado",
    github: "github.com/carlosjurado",
    seniority: "staff",
    area: "arquiteto",
    bio: "Arquiteto de Software, mentor e jurado em hackathons",
    role: "jurado",
  },
  {
    id: "4",
    email: "participante1@hackathonos.com",
    name: "João Silva",
    photo: undefined,
    linkedin: "linkedin.com/in/joaosilva",
    github: "github.com/joaosilva",
    seniority: "junior",
    area: "desenvolvedor",
    bio: "Desenvolvedor fullstack apaixonado por inovação",
    role: "participante",
  },
  {
    id: "5",
    email: "participante2@hackathonos.com",
    name: "Ana Costa",
    photo: undefined,
    linkedin: "linkedin.com/in/anacosta",
    github: "github.com/anacosta",
    seniority: "estudante",
    area: "designer",
    bio: "Designer UX/UI em formação",
    role: "participante",
  },
  {
    id: "6",
    email: "participante3@hackathonos.com",
    name: "Pedro Santos",
    photo: undefined,
    linkedin: "linkedin.com/in/pedrosantos",
    github: "github.com/pedrosantos",
    seniority: "junior",
    area: "dados",
    bio: "Cientista de dados júnior",
    role: "participante",
  },
  {
    id: "7",
    email: "jurado2@hackathonos.com",
    name: "Fernanda Lima",
    photo: undefined,
    linkedin: "linkedin.com/in/fernandalima",
    github: "github.com/fernandalima",
    seniority: "senior",
    area: "desenvolvedor",
    bio: "Tech Lead e mentora",
    role: "jurado",
  },
];

// MOCK EVENTS
export const mockEvents: Event[] = [
  {
    id: "evt1",
    name: "Hackathon AI 2024",
    description:
      "Desenvolva soluções inovadoras usando Inteligência Artificial para resolver problemas do mundo real",
    banner:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4959/d6a30c49-d9bb-4d40-9dfa-a15684cf4b11",
    registrations: 45,
    status: "aberto",
    url: "https://hackathonai.com",
    organizerId: "2",
    intro:
      "Bem-vindo ao Hackathon AI 2024! Este é um evento de 48 horas onde você irá criar soluções inovadoras usando IA.",
    awards: "1º Lugar: R$ 10.000 | 2º Lugar: R$ 5.000 | 3º Lugar: R$ 2.500",
    config: {
      requiresExtraFields: true,
      extraFields: [
        "Por que você quer participar?",
        "Qual sua experiência com IA?",
        "Link para portfólio",
      ],
      participantsListPublic: true,
      evaluationCriteria: [
        { name: "Inovação", weight: 30 },
        { name: "Execução Técnica", weight: 30 },
        { name: "Impacto", weight: 25 },
        { name: "Apresentação", weight: 15 },
      ],
      allowUserChallenges: true,
      challengesVotingPublic: false,
      deadlines: {
        registration: "2024-03-15",
        submission: "2024-04-01",
        evaluation: "2024-04-05",
      },
      submissionRequirements: [
        "Video do YouTube",
        "Repositório GitHub",
        "Nome e descrição do projeto",
        "PDF da apresentação",
      ],
      maxTeamSize: 5,
    },
  },
  {
    id: "evt2",
    name: "GreenTech Challenge",
    description:
      "Crie tecnologias sustentáveis para um futuro mais verde e consciente",
    banner:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4959/d457c8ec-5535-44d0-9139-207bf43a48eb",
    registrations: 32,
    status: "aberto",
    url: "https://greentechchallenge.com",
    organizerId: "2",
    intro:
      "O GreenTech Challenge busca soluções tecnológicas para problemas ambientais urgentes.",
    awards:
      "1º Lugar: R$ 15.000 + Mentoria | 2º Lugar: R$ 8.000 | 3º Lugar: R$ 4.000",
    config: {
      requiresExtraFields: false,
      participantsListPublic: true,
      evaluationCriteria: [
        { name: "Sustentabilidade", weight: 35 },
        { name: "Viabilidade", weight: 30 },
        { name: "Criatividade", weight: 20 },
        { name: "Escalabilidade", weight: 15 },
      ],
      allowUserChallenges: true,
      challengesVotingPublic: true,
      deadlines: {
        registration: "2024-04-10",
        submission: "2024-05-01",
        evaluation: "2024-05-10",
      },
      submissionRequirements: ["Video do YouTube", "Descrição do projeto"],
      maxTeamSize: 4,
    },
  },
  {
    id: "evt3",
    name: "FinTech Innovation",
    description:
      "Revolucione o mercado financeiro com soluções tecnológicas disruptivas",
    banner:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4959/6d7a8c1e-7a8e-4f5c-9d4e-2b3c5d6e7f8a",
    registrations: 28,
    status: "encerrado",
    url: "https://fintechinnovation.com",
    organizerId: "2",
    config: {
      requiresExtraFields: false,
      participantsListPublic: false,
      evaluationCriteria: [
        { name: "Inovação", weight: 40 },
        { name: "Segurança", weight: 30 },
        { name: "UX", weight: 30 },
      ],
      allowUserChallenges: false,
      challengesVotingPublic: false,
      deadlines: {
        registration: "2024-02-01",
        submission: "2024-02-15",
        evaluation: "2024-02-20",
      },
      submissionRequirements: [
        "Repositório GitHub",
        "Nome e descrição do projeto",
      ],
      maxTeamSize: 6,
    },
  },
];

// MOCK REGISTRATIONS
export const mockRegistrations: Registration[] = [
  { id: "r1", userId: "4", eventId: "evt1", status: "aprovado" },
  { id: "r2", userId: "5", eventId: "evt1", status: "aprovado" },
  { id: "r3", userId: "6", eventId: "evt1", status: "pendente" },
  { id: "r4", userId: "4", eventId: "evt2", status: "pendente" },
  { id: "r5", userId: "5", eventId: "evt2", status: "aprovado" },
];

// MOCK CHALLENGES
export const mockChallenges: Challenge[] = [
  {
    id: "ch1",
    eventId: "evt1",
    name: "Healthcare AI",
    description:
      "Desenvolva uma solução de IA para diagnóstico médico ou monitoramento de pacientes",
    approved: true,
    votes: 15,
  },
  {
    id: "ch2",
    eventId: "evt1",
    name: "Education AI",
    description:
      "Crie ferramentas de IA para personalizar o aprendizado de estudantes",
    approved: true,
    votes: 12,
  },
  {
    id: "ch3",
    eventId: "evt1",
    name: "Acessibilidade Digital",
    description:
      "Use IA para tornar a internet mais acessível para pessoas com deficiência",
    proposedBy: "4",
    approved: false,
    votes: 8,
  },
  {
    id: "ch4",
    eventId: "evt2",
    name: "Energia Renovável",
    description: "Soluções para otimizar o uso de energias renováveis",
    approved: true,
    votes: 20,
  },
  {
    id: "ch5",
    eventId: "evt2",
    name: "Redução de Resíduos",
    description: "Tecnologias para reduzir desperdício e melhorar reciclagem",
    approved: true,
    votes: 18,
  },
];

// MOCK TEAMS
export const mockTeams: Team[] = [
  {
    id: "t1",
    eventId: "evt1",
    name: "AI Pioneers",
    description: "Time focado em IA para saúde",
    leaderId: "4",
    memberIds: ["4", "5"],
    challengeId: "ch1",
  },
  {
    id: "t2",
    eventId: "evt2",
    name: "Green Warriors",
    description: "Lutando por um planeta sustentável",
    leaderId: "5",
    memberIds: ["5"],
    challengeId: "ch4",
  },
];

// MOCK SUBMISSIONS
export const mockSubmissions: Submission[] = [
  {
    id: "s1",
    eventId: "evt1",
    teamId: "t1",
    challengeId: "ch1",
    projectName: "MediScan AI",
    description:
      "Sistema de IA para análise de exames médicos usando visão computacional",
    youtubeUrl: "https://youtube.com/watch?v=example1",
    githubRepo: "https://github.com/aipioneers/mediscan",
    pdfUrl: "https://example.com/presentation.pdf",
    submittedAt: "2024-03-28T10:30:00Z",
    score: 85,
  },
];

// MOCK NOTIFICATIONS
export const mockNotifications: Notification[] = [
  {
    id: "n1",
    userId: "4",
    title: "Inscrição Aprovada! 🎉",
    message:
      "Sua inscrição no Hackathon AI 2024 foi aprovada! Bem-vindo ao evento.",
    read: false,
    createdAt: "2024-03-10T14:20:00Z",
    type: "approval",
  },
  {
    id: "n2",
    userId: "4",
    title: "Novo Desafio Disponível",
    message:
      "Um novo desafio foi adicionado ao Hackathon AI 2024: Education AI",
    read: true,
    createdAt: "2024-03-09T09:15:00Z",
    type: "announcement",
  },
  {
    id: "n3",
    userId: "5",
    title: "Convite para Time",
    message: "João Silva convidou você para participar do time AI Pioneers",
    read: false,
    createdAt: "2024-03-11T16:45:00Z",
    type: "invitation",
  },
  {
    id: "n6",
    userId: "6",
    title: "Inscrição Pendente",
    message:
      "Sua inscrição no Hackathon AI 2024 está em análise pela organização.",
    read: false,
    createdAt: "2024-03-12T11:00:00Z",
    type: "message",
  },
];

// Helper functions
export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getEventById(id: string): Event | undefined {
  return mockEvents.find((e) => e.id === id);
}

export function getUserRegistrations(userId: string): Registration[] {
  return mockRegistrations.filter((r) => r.userId === userId);
}

export function getEventRegistrations(eventId: string): Registration[] {
  return mockRegistrations.filter((r) => r.eventId === eventId);
}

export function getUserNotifications(userId: string): Notification[] {
  return mockNotifications.filter((n) => n.userId === userId);
}

export function getEventChallenges(eventId: string): Challenge[] {
  return mockChallenges.filter((c) => c.eventId === eventId && c.approved);
}

export function getEventTeams(eventId: string): Team[] {
  return mockTeams.filter((t) => t.eventId === eventId);
}

export function getEventSubmissions(eventId: string): Submission[] {
  return mockSubmissions.filter((s) => s.eventId === eventId);
}

export function isUserRegisteredInEvent(
  userId: string,
  eventId: string,
): Registration | undefined {
  return mockRegistrations.find((r) =>
    r.userId === userId && r.eventId === eventId
  );
}
