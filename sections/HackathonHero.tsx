import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "../islands/Button.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import FormModal from "../islands/FormModal.tsx";
import ScrollToButton from "../islands/ScrollToButton.tsx";

export interface Props {
  /** @title Eyebrow Text */
  eyebrowText?: string;
  /** @title Main Title */
  title?: string;
  /** @title Subtitle */
  subtitle?: string;
  /** @title Primary CTA Text */
  primaryButtonText?: string;
  /** @title Primary CTA URL */
  /** @description If provided, the button will be a link instead of opening the form modal */
  primaryButtonUrl?: string;
  /** @title Secondary CTA Text */
  secondaryButtonText?: string;
  /** @title Secondary CTA Target Section ID */
  /** @description ID of the section to scroll to (e.g., "partner-benefits"). Leave empty for external URL. */
  secondaryButtonTargetId?: string;
  /** @title Secondary CTA URL */
  /** @description External URL (only used if Target Section ID is empty) */
  secondaryButtonUrl?: string;
  /** @title Trust Signal Title */
  trustSignalTitle?: string;
  /** @title Partner Logos */
  /** @description Partner logos for the trust signal */
  partnerLogos?: ImageWidget[];
  /** @title Show Partner Logos */
  showPartnerLogos?: boolean;
  /** @title Desktop Background Image */
  /** @description Background image for desktop that appears above the background */
  backgroundImageDesktop?: ImageWidget;
  /** @title Mobile Background Image */
  /** @description Background image for mobile that appears above the background */
  backgroundImageMobile?: ImageWidget;
}

export default function HackathonHero({
  eyebrowText = "31/10 & 01/11",
  title = "Hackathon deco  AI Apps edition",
  subtitle = "Participe e resolva um desafio real de um cliente nosso em 48h",
  primaryButtonText = "Participar",
  primaryButtonUrl,
  secondaryButtonText = "Saber mais",
  secondaryButtonTargetId = "partner-benefits",
  secondaryButtonUrl,
  trustSignalTitle = "Ecossistema Deco",
  partnerLogos = [],
  showPartnerLogos = true,
  backgroundImageDesktop,
  backgroundImageMobile,
}: Props) {
  return (
    <section class="w-full bg-dc-50 flex flex-col p-2 relative z-10">
      <div class="bg-[#1C1917] pt-20 sm:pt-24 rounded-3xl flex flex-col min-h-[90vh] relative">
        {/* Background Images */}
        {/* Desktop Background */}
        {backgroundImageDesktop && (
          <div class="hidden sm:block absolute inset-0 z-0">
            <Image
              src={backgroundImageDesktop}
              alt="Background"
              width={1424}
              height={800}
              loading="lazy"
              class="w-full h-full object-cover opacity-20"
            />
          </div>
        )}

        {/* Mobile Background */}
        {backgroundImageMobile && (
          <div class="block sm:hidden absolute inset-0 z-0">
            <Image
              src={backgroundImageMobile}
              alt="Background"
              width={768}
              height={800}
              loading="lazy"
              class="w-full h-full object-cover opacity-20"
            />
          </div>
        )}

        {/* Main Content */}
        <div class="flex-1 flex flex-col items-center justify-center relative z-20 px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
          <div class="flex flex-col gap-6 sm:gap-8 lg:gap-12 items-center justify-start max-w-2xl">
            {/* Header */}
            <div class="flex flex-col gap-6 items-center justify-start w-full">
              {/* Eyebrow */}
              {eyebrowText && (
                <div class="flex items-center gap-2 bg-[#282524] px-4 py-2 rounded-full">
                  <Icon
                    name="calendar_month"
                    size="small"
                    class="text-[#D6D3D1]"
                  />
                  <span class="text-sm sm:text-base font-medium text-[#D6D3D1]">
                    {eyebrowText}
                  </span>
                </div>
              )}

              <h1 class="text-primary-light text-4xl sm:text-5xl lg:text-8xl font-medium leading-tight tracking-tight text-center">
                {title}
              </h1>
              {subtitle && (
                <p class="text-dc-50 text-base sm:text-lg leading-relaxed text-center max-w-lg">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div class="flex gap-2 items-start justify-start relative z-30">
              {primaryButtonText && (
                <>
                  {primaryButtonUrl
                    ? (
                      // If URL is provided, render a simple button link
                      <Button
                        variant="primary"
                        size="medium"
                        href={primaryButtonUrl}
                        class="!bg-primary-light !text-primary-dark hover:!bg-primary-light/90 relative z-30"
                      >
                        {primaryButtonText}
                      </Button>
                    )
                    : (
                      // If no URL, render the form modal
                      <FormModal
                        buttonText={primaryButtonText}
                        buttonClassName="px-6 py-3 bg-primary-light text-primary-dark rounded-lg font-semibold hover:bg-primary-light/90 transition-colors relative z-30"
                        modalTitle="Inscrição"
                        formFields={[
                          {
                            label: "Nome",
                            name: "Nome",
                            type: "text",
                            required: true,
                            placeholder: "Seu nome completo",
                          },
                          {
                            label: "Email",
                            name: "Email",
                            type: "email",
                            required: true,
                            placeholder: "seu@email.com",
                          },
                          {
                            label: "Número",
                            name: "Número",
                            type: "tel",
                            required: true,
                            placeholder: "+55 (11) 99999-9999",
                          },
                          {
                            label: "Empresa",
                            name: "Empresa",
                            type: "text",
                            required: true,
                            placeholder: "Nome da empresa",
                          },
                          {
                            label: "Cargo",
                            name: "Cargo",
                            type: "text",
                            required: true,
                            placeholder: "Seu cargo",
                          },
                          {
                            label: "Pretende participar em qual dia?",
                            name: "Dia de participação",
                            type: "multiselect",
                            required: true,
                            options: ["31/10", "01/11"],
                          },
                          {
                            label: "Possui time?",
                            name: "Possui time",
                            type: "checkbox",
                          },
                          {
                            label: "Tamanho do time",
                            name: "Tamanho do time",
                            type: "number",
                            placeholder: "Ex: 4",
                            showIfChecked: "Possui time",
                          },
                          {
                            label: "Nome e e-mail dos membros",
                            name: "Nome e e-mail dos membros",
                            type: "textarea",
                            placeholder:
                              "Nome 1: email1@example.com\nNome 2: email2@example.com",
                            showIfChecked: "Possui time",
                          },
                          {
                            label: "Observação",
                            name: "Observações",
                            type: "textarea",
                            placeholder: "Alguma observação adicional...",
                          },
                        ]}
                        submitButtonText="Enviar Inscrição"
                        successMessage="Inscrição enviada com sucesso! Entraremos em contato em breve."
                      />
                    )}
                </>
              )}
              {secondaryButtonText && (
                <>
                  {secondaryButtonTargetId
                    ? (
                      // If target ID is provided, use scroll button
                      <ScrollToButton
                        targetId={secondaryButtonTargetId}
                        class="px-6 py-3 bg-dc-50 text-dc-900 hover:bg-dc-100 rounded-lg font-semibold transition-colors relative z-30"
                      >
                        <span>{secondaryButtonText}</span>
                      </ScrollToButton>
                    )
                    : secondaryButtonUrl
                    ? (
                      // Otherwise use regular link button
                      <Button
                        variant="secondary"
                        size="medium"
                        href={secondaryButtonUrl}
                        class="!bg-dc-50 !text-dc-900 hover:!bg-dc-100 relative z-30"
                      >
                        {secondaryButtonText}
                      </Button>
                    )
                    : null}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Trust Signal Section */}
        {showPartnerLogos && partnerLogos.length > 0 && (
          <div class="w-full pb-8 sm:pb-10 pt-4 sm:pt-5 px-0 relative z-30">
            {trustSignalTitle && (
              <div class="text-primary-light text-sm sm:text-base font-mono leading-5 text-center uppercase mb-6 tracking-wide">
                {trustSignalTitle}
              </div>
            )}
            <div class="flex gap-6 sm:gap-9 items-center justify-center">
              {partnerLogos.map((logo, index) => (
                <div key={index} class="h-8 sm:h-10 lg:h-12 flex-shrink-0">
                  <Image
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    width={120}
                    height={48}
                    loading="lazy"
                    class="h-full w-auto object-contain opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
