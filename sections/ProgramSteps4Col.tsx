import { Check, Lightbulb } from "lucide-preact";
import FormModal from "../islands/FormModal.tsx";

export interface Step {
  /** @title Step Title */
  title: string;
  /** @title Step Description */
  description: string;
}

export interface FormField {
  /** @title Field Label */
  label: string;
  /** @title Field Name */
  name: string;
  /** @title Field Type */
  type: "text" | "email" | "tel" | "number" | "textarea" | "checkbox" | "select" | "multiselect";
  /** @title Required */
  required?: boolean;
  /** @title Placeholder */
  placeholder?: string;
  /** @title Options (for select) */
  options?: string[];
  /** @title Multiple Select */
  multiple?: boolean;
  /** @title Show If Checked (field name) */
  showIfChecked?: string;
}

export interface Props {
  /** @title Section Subtitle */
  subtitle?: string;
  /** @title Section Title */
  title?: string;
  /** @title Steps */
  steps?: Step[];
  /** @title Tip Text */
  tipText?: string;
  /** @title Tip CTA Text */
  tipCtaText?: string;
  /** @title Enable Form Modal */
  enableFormModal?: boolean;
  /** @title Modal Title */
  modalTitle?: string;
  /** @title Form Fields */
  formFields?: FormField[];
  /** @title Submit Button Text */
  submitButtonText?: string;
  /** @title Success Message */
  successMessage?: string;
}

export default function ProgramSteps4Col({
  subtitle = "Momentos principais",
  title = "Como funciona",
  steps = [
    {
      title: "Kick-off | 31/10 & 01/11",
      description: "Cada dia terá um desafio diferente a ser divulgado no kick-off. Escolha o dia mais conveniente."
    },
    {
      title: "Check-points",
      description: "Encontros ao longo de cada dia, para alinhamento, dúvidas e suporte técnico."
    },
    {
      title: "Entrega final",
      description: "A entrega será realizada de forma assíncrona, através do upload da sua solução até 48h após o kick-off."
    },
    {
      title: "Resultados",
      description: "Anúncio dos vencedores em live aberta durante a semana seguinte"
    }
  ],
  tipText = "As vagas são limitadas, se inscreva e confirmaremos sua participação até dia 23/10",
  tipCtaText = "Participar",
  enableFormModal = true,
  modalTitle = "Inscrição",
  formFields = [
    { 
      label: "Nome", 
      name: "Nome", 
      type: "text", 
      required: true, 
      placeholder: "Seu nome completo" 
    },
    { 
      label: "Email", 
      name: "Email", 
      type: "email", 
      required: true, 
      placeholder: "seu@email.com" 
    },
    { 
      label: "Número", 
      name: "Número", 
      type: "tel", 
      required: true, 
      placeholder: "+55 (11) 99999-9999" 
    },
    { 
      label: "Empresa", 
      name: "Empresa", 
      type: "text", 
      required: true, 
      placeholder: "Nome da empresa" 
    },
    { 
      label: "Cargo", 
      name: "Cargo", 
      type: "text", 
      required: true, 
      placeholder: "Seu cargo" 
    },
    { 
      label: "Pretende participar em qual dia?*", 
      name: "Dia de participação", 
      type: "multiselect", 
      required: true,
      options: ["31/10", "01/11"]
    },
    { 
      label: "Possui time?", 
      name: "Possui time", 
      type: "checkbox" 
    },
    { 
      label: "Tamanho do time",
      name: "Tamanho do time",
      type: "number",
      placeholder: "Ex: 4",
      showIfChecked: "Possui time"
    },
    { 
      label: "Nome e e-mail dos membros", 
      name: "Nome e e-mail dos membros", 
      type: "textarea", 
      placeholder: "Nome 1: email1@example.com\nNome 2: email2@example.com",
      showIfChecked: "Possui time"
    },
    { 
      label: "Observação", 
      name: "Observações", 
      type: "textarea", 
      placeholder: "Alguma observação adicional..." 
    },
  ],
  submitButtonText = "Enviar Inscrição",
  successMessage = "Obrigado pela inscrição! Entraremos em contato em breve.",
}: Props) {
  return (
    <section class="w-full bg-dc-50 py-16 sm:py-20 lg:py-32">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div class="flex flex-col gap-8 sm:gap-12 lg:gap-20">
          {/* Header */}
          <div class="flex flex-col gap-3 items-start justify-center max-w-lg">
            {subtitle && (
              <div class="text-dc-500 text-sm sm:text-base font-mono leading-5 uppercase tracking-wide">
                {subtitle}
              </div>
            )}
            {title && (
              <h2 class="text-dc-800 text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
                {title}
              </h2>
            )}
          </div>

          {/* Steps Flow */}
          <div class="py-6 sm:py-8 lg:py-12">
            {/* Mobile/Tablet: Vertical Layout */}
            <div class="flex flex-col gap-6 sm:gap-8 lg:hidden relative">
              {steps.map((step, index) => (
                <div key={index} class="flex items-start gap-4 relative">
                  {/* Check Icon */}
                  <div class="relative flex-shrink-0">
                    <div class="w-12 h-12 sm:w-14 sm:h-14 bg-primary-light rounded-full flex items-center justify-center">
                      <Check
                        size={20}
                        strokeWidth={2}
                        class="text-primary-dark"
                      />
                    </div>

                    {/* Vertical Connecting Line */}
                    {index < steps.length - 1 && (
                      <div class="absolute top-12 sm:top-14 left-1/2 transform -translate-x-1/2 w-0.5 h-6 sm:h-8 bg-primary-light">
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div class="flex flex-col gap-2 pt-1">
                    <h3 class="text-dc-800 text-lg sm:text-xl font-normal leading-tight">
                      {step.title}
                    </h3>
                    <p class="text-dc-800 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Horizontal Layout - 4 Columns */}
            <div class="hidden lg:grid grid-cols-4 gap-6 relative">
              {steps.map((step, index) => (
                <div
                  key={index}
                  class="flex flex-col gap-4 items-start relative"
                >
                  {/* Check Icon */}
                  <div class="relative">
                    <div class="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center">
                      <Check
                        size={28}
                        strokeWidth={2}
                        class="text-primary-dark"
                      />
                    </div>

                    {/* Horizontal Connecting Line */}
                    {index < steps.length - 1 && (
                      <div
                        class="absolute top-7 left-14 w-full h-0.5 bg-primary-light"
                        style={{ width: "calc(100vw / 4 - 4.5rem)" }}
                      >
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div class="flex flex-col gap-3">
                    <h3 class="text-dc-800 text-lg sm:text-xl font-normal leading-tight">
                      {step.title}
                    </h3>
                    <p class="text-dc-800 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip Section */}
          {tipText && tipCtaText && (
            <div class="bg-primary-dark rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div class="flex items-center gap-3 flex-shrink-0">
                <Lightbulb
                  size={28}
                  strokeWidth={2}
                  class="text-primary-light"
                />
              </div>

              <div class="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <p class="text-primary-light text-lg sm:text-xl lg:text-2xl font-normal leading-tight flex-1">
                  {tipText}
                </p>

                {enableFormModal ? (
                  <FormModal
                    buttonText={tipCtaText}
                    buttonClassName="!bg-primary-light !text-primary-dark hover:!bg-primary-light/90 px-6 py-3 rounded-xl font-medium text-base transition-colors flex-shrink-0"
                    modalTitle={modalTitle}
                    formFields={formFields}
                    submitButtonText={submitButtonText}
                    successMessage={successMessage}
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
