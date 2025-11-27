import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Button from "../components/ui/Button.tsx";
import Icon from "../components/ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";

export interface CTA {
  /**
   * @title Texto do botão
   * @description Texto que aparece no botão
   */
  text: string;
  /**
   * @title URL do botão
   * @description Link para onde o botão deve levar (deixe vazio para abrir modal)
   */
  href?: string;
  /**
   * @title Estilo do botão
   * @description Escolha o estilo visual do botão
   */
  variant?: "primary" | "secondary";
  /**
   * @title Abre modal de regras?
   * @description Se marcado, o botão abre o modal de regulamento
   */
  opensRulesModal?: boolean;
}

/**
 * @titleBy title
 */
export interface RuleSection {
  /**
   * @title Ícone
   * @description Nome do ícone Material Design (ex: gift, clock, user, check_circle)
   */
  icon?: string;
  /**
   * @title Título da seção
   */
  title: string;
  /**
   * @title Conteúdo
   * @description Texto ou HTML da seção
   */
  content: RichText;
  /**
   * @title Destacar seção?
   * @description Adiciona um fundo destacado (para prêmio, por exemplo)
   */
  highlight?: boolean;
}

export interface RulesModal {
  /**
   * @title Título do modal
   */
  title?: string;
  /**
   * @title Seções das regras
   * @description Lista de seções com as regras
   */
  sections?: RuleSection[];
  /**
   * @title Texto do botão de fechar
   */
  closeButtonText?: string;
}

export interface Props {
  /**
   * @title Logo
   * @description Logo que aparece acima do título principal
   */
  logo?: ImageWidget;
  /**
   * @title Eyebrow / Badge
   * @description Texto do badge animado acima do título
   */
  eyebrow?: string;
  /**
   * @title Título principal
   * @description Título principal do desafio (use \n para quebra de linha)
   */
  title: string;
  /**
   * @title Subtítulo
   * @description Texto descritivo que aparece abaixo do título (suporta HTML)
   */
  subtitle: RichText;
  /**
   * @title Botões de ação
   * @description Lista de botões que aparecerão no hero
   * @maxItems 2
   */
  ctas: CTA[];
  /**
   * @title Data do evento
   * @description Data final para o countdown (formato: YYYY-MM-DDTHH:mm:ss)
   */
  eventDate: string;
  /**
   * @title Modal de Regulamento
   * @description Configurações do modal com as regras do desafio
   */
  rulesModal?: RulesModal;
}

const defaultProps: Props = {
  logo: "/deco-logo-challenge.svg",
  eyebrow: undefined,
  title: "Construa um app de IA e ganhe um Macbook",
  subtitle:
    'Use este mês para criar uma solução real, resolver um problema de verdade e concorrer a <strong class="text-white font-bold">2 MacBooks Air M3</strong> (um para cada vencedor).<br/><span class="block mt-4 text-white/70">O relógio já está correndo. Comece agora.</span>',
  ctas: [
    {
      text: "Entregue seu projeto (em breve)",
      href: undefined,
      variant: "primary",
    },
    {
      text: "Ler as regras",
      variant: "secondary",
      opensRulesModal: true,
    },
  ],
  eventDate: "2026-01-03T23:59:59",
  rulesModal: {
    title: "Regras do Jogo",
    closeButtonText: "Entendi, bora pro desafio! 🚀",
    sections: [
      {
        icon: "redeem",
        title: "O Grande Prêmio",
        content:
          "<p><strong>2x MacBook Air M3 💻</strong></p><p class='text-dc-500 text-sm mt-1'>1 Mac para cada projeto vencedor (2 vencedores).</p>",
        highlight: true,
      },
      {
        icon: "group",
        title: "QUEM PODE PARTICIPAR?",
        content:
          "<ul><li><strong>Qualquer pessoa neste grupo.</strong> Se você está lendo isso, você está dentro.</li><li><strong>Zero experiência necessária.</strong> Não precisa saber programar ou ter faculdade. Usaremos IA para criar.</li></ul>",
      },
      {
        icon: "map",
        title: "SUA MISSÃO (O QUE FAZER)",
        content:
          "<ol><li><strong>Descubra um problema</strong> - Converse com 1 pessoa que tenha um problema repetitivo no dia a dia.</li><li><strong>Crie a solução na Deco</strong> - Use nossa plataforma para criar um App de IA que resolva isso.</li><li><strong>Teste de Verdade</strong> - Valide o app com a pessoa do passo 1 (ou alguém similar).</li><li><strong>Grave um Vídeo</strong> - Registre o processo e o resultado.</li></ol>",
      },
      {
        icon: "inventory_2",
        title: "O QUE ENTREGAR",
        content:
          "<p>No formulário final, envie:</p><ul><li><strong>Link do seu App</strong> criado na Deco.</li><li><strong>Vídeo de Pitch (2 a 3 min):</strong> Mostre o problema, o app funcionando na prática e conte brevemente como foi seu processo de teste e ajustes.</li></ul>",
      },
      {
        icon: "alarm",
        title: "PRAZO FINAL",
        content:
          "<p class='text-red-600 font-bold'>30 dias a partir de hoje.</p>",
      },
    ],
  },
};

export default function ChallengeHero({
  logo = defaultProps.logo,
  eyebrow = defaultProps.eyebrow,
  title = defaultProps.title,
  subtitle = defaultProps.subtitle,
  ctas = defaultProps.ctas,
  eventDate = defaultProps.eventDate,
  rulesModal = defaultProps.rulesModal,
}: Props) {
  const sectionId = `challenge-hero-${Math.random().toString(36).substr(2, 9)}`;
  const modalId = `rules-modal-${sectionId}`;

  return (
    <>
      {/* Load GSAP library */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" />

      <div class="w-full bg-dc-50 h-screen flex flex-col">
        <div class="p-2 flex-1 flex flex-col">
          <div
            id={sectionId}
            class="w-full bg-primary-dark rounded-2xl overflow-hidden relative flex-1 flex flex-col justify-center items-center"
          >
            {/* ASCII Dots Background */}
            <div
              id={`ascii-canvas-${sectionId}`}
              class="absolute inset-0 z-10 pointer-events-none"
            />

            {/* Logo at top */}
            {logo && (
              <nav class="absolute top-0 w-full flex justify-center pt-8 z-40">
                <a href="https://www.decocms.com/" target="_blank" rel="noopener noreferrer" class="cursor-pointer">
                  <img src={logo} alt="Logo" class="w-20 lg:w-40 h-auto object-contain" />
                </a>
              </nav>
            )}

            <div class="relative z-30 w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-16 flex flex-col justify-center items-center h-full text-center">
              {/* Centered Content */}
              <div class="flex flex-col justify-center items-center gap-6 md:gap-8 flex-1">
                {/* Eyebrow Badge */}
                {eyebrow && (
                  <div
                    id={`badge-${sectionId}`}
                    class="opacity-0 translate-y-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light/10 border border-primary-light/30 backdrop-blur-md text-sm font-bold text-primary-light animate-pulse"
                  >
                    <span class="w-2 h-2 rounded-full bg-primary-light shadow-lg" />
                    {eyebrow}
                  </div>
                )}

                {/* Title + Subtitle */}
                <div
                  id={`content-${sectionId}`}
                  class="flex flex-col justify-center items-center gap-6 max-w-4xl opacity-0 translate-y-8"
                >
                  <h1 class="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-tight tracking-tight">
                    {title.toLowerCase().includes("macbook") ? (
                      <>
                        <span class="text-white">{title.substring(0, title.toLowerCase().lastIndexOf("macbook"))}</span>
                        <span class="text-primary-light">{title.substring(title.toLowerCase().lastIndexOf("macbook"))}</span>
                      </>
                    ) : (
                      <span class="text-white">{title}</span>
                    )}
                  </h1>
                  <p
                    class="text-center text-dc-300 text-lg md:text-xl max-w-3xl leading-relaxed font-light"
                    dangerouslySetInnerHTML={{ __html: subtitle }}
                  />
                </div>

                {/* CTAs */}
                <div
                  id={`ctas-${sectionId}`}
                  class="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto opacity-0 translate-y-8"
                >
                  {ctas?.map((cta) =>
                    cta.opensRulesModal ? (
                      <button
                        type="button"
                        data-modal-toggle={modalId}
                        class="rounded-xl inline-flex justify-center items-center font-medium transition-colors hover:scale-95 transition-transform duration-200 ease-in-out bg-dc-50 text-dc-800 outline outline-1 outline-offset-[-0.5px] outline-dc-300 hover:bg-dc-100 active:bg-dc-200 px-5 py-3 text-lg gap-2.5 w-full sm:w-auto min-w-48"
                      >
                        {cta.text}
                      </button>
                    ) : cta.href ? (
                      <Button
                        href={cta.href}
                        variant={cta.variant}
                        size="large"
                        className="w-full sm:w-auto min-w-48 hover:scale-105 transition-transform duration-200 ease-out"
                      >
                        {cta.text}
                      </Button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        class="rounded-xl inline-flex justify-center items-center font-medium px-5 py-3 text-lg gap-2.5 w-full sm:w-auto min-w-48 bg-primary-light/70 text-primary-dark cursor-not-allowed opacity-80"
                      >
                        {cta.text}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Countdown - At Bottom */}
              <div
                id={`countdown-${sectionId}`}
                class="flex gap-4 md:gap-8 text-center opacity-0 translate-y-8"
              >
                <div class="text-center">
                  <span
                    id={`days-${sectionId}`}
                    class="text-3xl md:text-5xl font-bold text-primary-light font-main tabular-nums"
                  >
                    00
                  </span>
                  <div class="text-xs uppercase tracking-widest text-white/60 mt-1">
                    Dias
                  </div>
                </div>
                <div class="text-center">
                  <span
                    id={`hours-${sectionId}`}
                    class="text-3xl md:text-5xl font-bold text-primary-light font-main tabular-nums"
                  >
                    00
                  </span>
                  <div class="text-xs uppercase tracking-widest text-white/60 mt-1">
                    Horas
                  </div>
                </div>
                <div class="text-center">
                  <span
                    id={`minutes-${sectionId}`}
                    class="text-3xl md:text-5xl font-bold text-primary-light font-main tabular-nums"
                  >
                    00
                  </span>
                  <div class="text-xs uppercase tracking-widest text-white/60 mt-1">
                    Min
                  </div>
                </div>
                <div class="text-center">
                  <span
                    id={`seconds-${sectionId}`}
                    class="text-3xl md:text-5xl font-bold text-primary-light font-main tabular-nums"
                  >
                    00
                  </span>
                  <div class="text-xs uppercase tracking-widest text-white/60 mt-1">
                    Seg
                  </div>
                </div>
              </div>
            </div>

            {/* GSAP Animation Script */}
            <script
              type="module"
              dangerouslySetInnerHTML={{
                __html: useScript((sectionId: string) => {
                  function initGsapAnimations() {
                    const gsap = (globalThis as any).gsap;
                    if (!gsap) {
                      setTimeout(initGsapAnimations, 100);
                      return;
                    }

                    const badge = document.getElementById(`badge-${sectionId}`);
                    const content = document.getElementById(
                      `content-${sectionId}`
                    );
                    const ctas = document.getElementById(`ctas-${sectionId}`);
                    const countdown = document.getElementById(
                      `countdown-${sectionId}`
                    );

                    if (badge) {
                      gsap.to(badge, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                        delay: 0.1,
                      });
                    }

                    if (content) {
                      gsap.to(content, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: 0.25,
                      });
                    }

                    if (ctas) {
                      gsap.to(ctas, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: 0.45,
                      });
                    }

                    if (countdown) {
                      gsap.to(countdown, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: 0.6,
                      });
                    }
                  }

                  if (document.readyState === "loading") {
                    document.addEventListener(
                      "DOMContentLoaded",
                      initGsapAnimations
                    );
                  } else {
                    initGsapAnimations();
                  }
                }, sectionId),
              }}
            />

            {/* ASCII Animation Script */}
            <script
              type="module"
              dangerouslySetInnerHTML={{
                __html: useScript((sectionId: string) => {
                  const CHARS = "⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠘⠨⠊⠋⠌⠍⠎⠏";
                  let GRID_WIDTH = 80;
                  let GRID_HEIGHT = 40;

                  interface Wave {
                    x: number;
                    y: number;
                    frequency: number;
                    amplitude: number;
                    phase: number;
                    speed: number;
                  }

                  function initAsciiAnimation() {
                    const container = document.getElementById(
                      `ascii-canvas-${sectionId}`
                    );
                    if (!container) return;

                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return;

                    canvas.style.position = "absolute";
                    canvas.style.top = "0";
                    canvas.style.left = "0";
                    canvas.style.width = "100%";
                    canvas.style.height = "100%";
                    container.appendChild(canvas);

                    function updateCanvasSize() {
                      if (!container || !ctx) return;
                      const rect = container.getBoundingClientRect();
                      const dpr = globalThis.devicePixelRatio || 1;
                      canvas.width = rect.width * dpr;
                      canvas.height = rect.height * dpr;
                      GRID_WIDTH = Math.floor(rect.width / 20);
                      GRID_HEIGHT = Math.floor(rect.height / 20);
                      ctx.scale(dpr, dpr);
                      ctx.font = "14px monospace";
                      ctx.textAlign = "center";
                      ctx.textBaseline = "middle";
                    }

                    updateCanvasSize();

                    const mouse = { x: 0, y: 0 };
                    const waves: Wave[] = [];
                    let time = 0;

                    for (let i = 0; i < 3; i++) {
                      waves.push({
                        x: GRID_WIDTH * (0.25 + Math.random() * 0.5),
                        y: GRID_HEIGHT * (0.25 + Math.random() * 0.5),
                        frequency: 0.2 + Math.random() * 0.3,
                        amplitude: 0.5 + Math.random() * 0.5,
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.5 + Math.random() * 0.5,
                      });
                    }

                    function update(delta: number) {
                      time += delta * 0.75;
                      const newGrid = Array(GRID_HEIGHT)
                        .fill(0)
                        .map(() => Array(GRID_WIDTH).fill(null));

                      const mouseX = ((mouse.x + 1) * GRID_WIDTH) / 2;
                      const mouseY = ((1 - mouse.y) * GRID_HEIGHT) / 2;
                      const mouseWave: Wave = {
                        x: mouseX,
                        y: mouseY,
                        frequency: 0.3,
                        amplitude: 1,
                        phase: time * 2,
                        speed: 1,
                      };

                      function isInTitleArea(x: number, y: number): boolean {
                        const centerX = GRID_WIDTH / 2;
                        const centerY = GRID_HEIGHT / 2;
                        const radiusX = GRID_WIDTH * 0.25;
                        const radiusY = GRID_HEIGHT * 0.32;
                        const normalizedX = (x - centerX) / radiusX;
                        const normalizedY = (y - centerY) / radiusY;
                        return (
                          normalizedX * normalizedX +
                            normalizedY * normalizedY <=
                          1
                        );
                      }

                      for (let y = 0; y < GRID_HEIGHT; y++) {
                        for (let x = 0; x < GRID_WIDTH; x++) {
                          if (isInTitleArea(x, y)) continue;

                          let totalWave = 0;
                          const allWaves = waves.concat([mouseWave]);
                          allWaves.forEach((wave) => {
                            const dx = x - wave.x;
                            const dy = y - wave.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            const falloff = 1 / (1 + dist * 0.1);
                            const value =
                              Math.sin(
                                dist * wave.frequency -
                                  time * wave.speed +
                                  wave.phase
                              ) *
                              wave.amplitude *
                              falloff;
                            totalWave += value;
                          });

                          const normalizedWave = (totalWave + 2) / 4;
                          if (Math.abs(totalWave) > 0.2) {
                            const charIndex = Math.min(
                              CHARS.length - 1,
                              Math.max(
                                0,
                                Math.floor(normalizedWave * (CHARS.length - 1))
                              )
                            );
                            const opacity = Math.min(
                              0.9,
                              Math.max(0.3, 0.3 + normalizedWave * 0.6)
                            );
                            newGrid[y][x] = {
                              char: CHARS[charIndex] || CHARS[0],
                              opacity: opacity,
                            };
                          }
                        }
                      }

                      if (!ctx) return;
                      ctx.clearRect(0, 0, canvas.width, canvas.height);

                      if (!container) return;
                      const rect = container.getBoundingClientRect();
                      const cellWidth = rect.width / GRID_WIDTH;
                      const cellHeight = rect.height / GRID_HEIGHT;

                      for (let y = 0; y < GRID_HEIGHT; y++) {
                        for (let x = 0; x < GRID_WIDTH; x++) {
                          const cell = newGrid[y][x];
                          if (cell && cell.char && CHARS.includes(cell.char)) {
                            ctx.fillStyle = `rgba(208, 236, 26, ${
                              cell.opacity || 0.4
                            })`;
                            ctx.fillText(
                              cell.char,
                              x * cellWidth + cellWidth / 2,
                              y * cellHeight + cellHeight / 2
                            );
                          }
                        }
                      }
                    }

                    function handleMouseMove(event: MouseEvent) {
                      const rect = canvas.getBoundingClientRect();
                      const x = (event.clientX - rect.left) / rect.width;
                      const y = (event.clientY - rect.top) / rect.height;
                      mouse.x = x * 2 - 1;
                      mouse.y = y * 2 - 1;
                    }

                    function handleResize() {
                      updateCanvasSize();
                    }

                    globalThis.addEventListener("resize", handleResize);
                    canvas.addEventListener("mousemove", handleMouseMove);

                    let lastTime = 0;
                    function animate(currentTime: number) {
                      const delta = Math.min(
                        (currentTime - lastTime) / 1000,
                        0.1
                      );
                      lastTime = currentTime;
                      update(delta);
                      requestAnimationFrame(animate);
                    }

                    requestAnimationFrame(animate);
                  }

                  function delayedInit() {
                    setTimeout(initAsciiAnimation, 100);
                  }

                  if (document.readyState === "loading") {
                    document.addEventListener("DOMContentLoaded", delayedInit);
                  } else {
                    delayedInit();
                  }
                }, sectionId),
              }}
            />

            {/* Countdown Script */}
            <script
              type="module"
              dangerouslySetInnerHTML={{
                __html: useScript(
                  (eventDate: string, sectionId: string) => {
                    function updateCountdown() {
                      const now = new Date().getTime();
                      const eventTime = new Date(eventDate).getTime();
                      const distance = eventTime - now;

                      const daysEl = document.getElementById(
                        `days-${sectionId}`
                      );
                      const hoursEl = document.getElementById(
                        `hours-${sectionId}`
                      );
                      const minutesEl = document.getElementById(
                        `minutes-${sectionId}`
                      );
                      const secondsEl = document.getElementById(
                        `seconds-${sectionId}`
                      );

                      if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
                        return;
                      }

                      if (distance < 0) {
                        daysEl.textContent = "00";
                        hoursEl.textContent = "00";
                        minutesEl.textContent = "00";
                        secondsEl.textContent = "00";
                        return;
                      }

                      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                      const hours = Math.floor(
                        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                      );
                      const minutes = Math.floor(
                        (distance % (1000 * 60 * 60)) / (1000 * 60)
                      );
                      const seconds = Math.floor(
                        (distance % (1000 * 60)) / 1000
                      );

                      daysEl.textContent = days.toString().padStart(2, "0");
                      hoursEl.textContent = hours.toString().padStart(2, "0");
                      minutesEl.textContent = minutes
                        .toString()
                        .padStart(2, "0");
                      secondsEl.textContent = seconds
                        .toString()
                        .padStart(2, "0");
                    }

                    function startCountdown() {
                      updateCountdown();
                      setInterval(updateCountdown, 1000);
                    }

                    if (document.readyState === "loading") {
                      document.addEventListener("DOMContentLoaded", () => {
                        setTimeout(startCountdown, 100);
                      });
                    } else {
                      setTimeout(startCountdown, 100);
                    }
                  },
                  eventDate,
                  sectionId
                ),
              }}
            />
          </div>
        </div>
      </div>

      {/* Rules Modal */}
      {rulesModal && (
        <div
          id={modalId}
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/40 backdrop-blur-sm opacity-0 invisible transition-all duration-300"
          data-modal
        >
          <div class="bg-white text-dc-900 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-10 relative shadow-2xl ring-4 ring-primary-light/30 transform scale-95 transition-transform duration-300">
            {/* Close Button */}
            <button
              type="button"
              data-modal-close={modalId}
              class="absolute top-4 right-4 p-2 hover:bg-dc-100 rounded-full transition-colors z-10"
            >
              <Icon name="close" size="medium" />
            </button>

            {/* Header */}
            <div class="text-center mb-8">
              <div class="inline-block p-3 rounded-full bg-primary-light/20 mb-4">
                <Icon name="description" size="large" class="text-primary-dark" />
              </div>
              <h2 class="text-3xl font-extrabold uppercase tracking-tight leading-none">
                REGRAS DO DESAFIO
              </h2>
              <p class="text-dc-500 mt-2">Leia para garantir sua participação</p>
            </div>

            <div class="space-y-8 text-sm md:text-base leading-relaxed">
              {/* Prize Section - Special styling */}
              <div class="bg-gradient-to-r from-primary-dark to-primary-dark/80 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                <div class="relative z-10">
                  <h3 class="font-bold flex items-center gap-2 mb-2 text-primary-light uppercase tracking-wide text-xs">
                    <Icon name="redeem" size="small" /> O PRÊMIO
                  </h3>
                  <div class="text-2xl font-bold">2x MacBook Air M3 💻</div>
                  <p class="text-white/80 text-sm mt-1">
                    1 Mac para cada projeto vencedor (2 vencedores).
                  </p>
                </div>
                <div class="absolute -right-6 -bottom-10 w-32 h-32 bg-primary-light rounded-full opacity-20 blur-2xl" />
              </div>

              {/* Eligibility */}
              <div>
                <h3 class="font-bold flex items-center gap-2 mb-3 text-lg text-primary-dark">
                  <Icon name="group" size="small" /> QUEM PODE PARTICIPAR?
                </h3>
                <ul class="space-y-3 text-dc-600">
                  <li class="flex items-start gap-3 bg-dc-50 p-3 rounded-lg">
                    <div class="bg-green-100 p-1 rounded text-green-700 mt-0.5">
                      <Icon name="check" size="small" />
                    </div>
                    <span><strong class="text-dc-800">Qualquer pessoa.</strong> Se você está lendo isso, você pode participar.</span>
                  </li>
                  <li class="flex items-start gap-3 bg-dc-50 p-3 rounded-lg">
                    <div class="bg-green-100 p-1 rounded text-green-700 mt-0.5">
                      <Icon name="check" size="small" />
                    </div>
                    <span><strong class="text-dc-800">Zero experiência necessária.</strong> Não precisa saber programar ou ter faculdade.</span>
                  </li>
                </ul>
              </div>

              {/* Mission Steps */}
              <div>
                <h3 class="font-bold flex items-center gap-2 mb-4 text-lg text-primary-dark">
                  <Icon name="map" size="small" /> SUA MISSÃO (O QUE FAZER)
                </h3>
                <div class="space-y-0 relative">
                  <div class="absolute left-4 top-4 bottom-4 w-0.5 bg-dc-200" />
                  <div class="relative flex gap-4 mb-6">
                    <div class="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center font-bold text-sm shrink-0 z-10">1</div>
                    <div>
                      <h4 class="font-bold text-primary-dark">Descubra um problema</h4>
                      <p class="text-dc-500 text-sm">Converse com 1 pessoa que tenha um problema repetitivo no dia a dia.</p>
                    </div>
                  </div>
                  <div class="relative flex gap-4 mb-6">
                    <div class="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center font-bold text-sm shrink-0 z-10">2</div>
                    <div>
                      <h4 class="font-bold text-primary-dark">Crie a solução na deco</h4>
                      <p class="text-dc-500 text-sm">Use nossa plataforma para criar um App de IA que resolva isso.</p>
                    </div>
                  </div>
                  <div class="relative flex gap-4 mb-6">
                    <div class="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center font-bold text-sm shrink-0 z-10">3</div>
                    <div>
                      <h4 class="font-bold text-primary-dark">Teste de Verdade</h4>
                      <p class="text-dc-500 text-sm">Valide o app com a pessoa do passo 1 (ou alguém similar).</p>
                    </div>
                  </div>
                  <div class="relative flex gap-4 mb-2">
                    <div class="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center font-bold text-sm shrink-0 z-10">4</div>
                    <div>
                      <h4 class="font-bold text-primary-dark">Grave um Vídeo</h4>
                      <p class="text-dc-500 text-sm">Registre o processo e o resultado.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h3 class="font-bold flex items-center gap-2 mb-3 text-lg text-primary-dark">
                  <Icon name="inventory_2" size="small" /> O QUE ENTREGAR
                </h3>
                <p class="mb-3 text-dc-600">No formulário final (que disponibilizaremos em breve), você vai enviar:</p>
                <ul class="list-disc pl-5 space-y-2 text-dc-600 bg-dc-50 p-4 rounded-lg">
                  <li><strong class="text-dc-800">Link do seu App</strong> criado na deco.</li>
                  <li><strong class="text-dc-800">Vídeo de Pitch (2 a 3 min):</strong> Mostre o problema, o app funcionando na prática e conte brevemente como foi seu processo de teste e ajustes.</li>
                </ul>
              </div>

              {/* Deadline */}
              <div class="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg">
                <Icon name="alarm" size="small" />
                <p class="text-sm font-bold">PRAZO FINAL: 30 dias a partir de hoje.</p>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-dc-200 text-center">
              <button
                type="button"
                data-modal-close={modalId}
                class="w-full bg-primary-dark text-white font-bold py-4 rounded-xl hover:bg-primary-dark/90 transition-all transform hover:scale-[1.01] shadow-lg"
              >
                {rulesModal.closeButtonText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((modalId: string) => {
            function initModal() {
              const modal = document.getElementById(modalId);
              if (!modal) return;

              const toggleButtons = document.querySelectorAll(
                `[data-modal-toggle="${modalId}"]`
              );
              const closeButtons = document.querySelectorAll(
                `[data-modal-close="${modalId}"]`
              );

              function openModal() {
                if (!modal) return;
                modal.classList.remove("opacity-0", "invisible");
                modal.classList.add("opacity-100", "visible");
                const content = modal.querySelector("div");
                if (content) {
                  content.classList.remove("scale-95");
                  content.classList.add("scale-100");
                }
                document.body.style.overflow = "hidden";
              }

              function closeModal() {
                if (!modal) return;
                modal.classList.add("opacity-0", "invisible");
                modal.classList.remove("opacity-100", "visible");
                const content = modal.querySelector("div");
                if (content) {
                  content.classList.add("scale-95");
                  content.classList.remove("scale-100");
                }
                document.body.style.overflow = "";
              }

              toggleButtons.forEach((btn) => {
                btn.addEventListener("click", openModal);
              });

              closeButtons.forEach((btn) => {
                btn.addEventListener("click", closeModal);
              });

              // Close on backdrop click
              modal?.addEventListener("click", (e) => {
                if (e.target === modal) {
                  closeModal();
                }
              });

              // Close on Escape key
              document.addEventListener("keydown", (e) => {
                if (
                  e.key === "Escape" &&
                  modal &&
                  !modal.classList.contains("invisible")
                ) {
                  closeModal();
                }
              });
            }

            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", initModal);
            } else {
              initModal();
            }
          }, modalId),
        }}
      />
    </>
  );
}

export function Preview() {
  return <ChallengeHero {...defaultProps} />;
}
