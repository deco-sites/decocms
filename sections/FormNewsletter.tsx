import SendFormNewsletter from "../islands/SendFormNewsletter.tsx";

export interface Props {
  /** @title Título da Newsletter */
  title?: string;
  /** @title Descrição da Newsletter */
  description?: string;
  /** @title Placeholder do Email */
  inputPlaceholder?: string;
  /** @title Texto do Botão */
  buttonText?: string;
  /** @title Endpoint de ação */
  /** @description URL para onde o formulário será enviado */
  actionUrl?: string;
  /** @title Termo de privacidade */
  term?: string;
  /** @title Mensagem de sucesso */
  successMessage?: string;
  /** @title Mensagem de erro */
  errorMessage?: string;
}

export default function FormNewsletter({
  title = "Stay up to date",
  description =
    "Subscribe to our newsletter and get the latest updates, tips, and exclusive content delivered straight to your inbox.",
  inputPlaceholder = "Enter your email",
  buttonText = "Subscribe",
  actionUrl = "/api/newsletter",
  term = "We respect your privacy. Unsubscribe at any time.",
  successMessage = "Thank you for subscribing to our newsletter!",
  errorMessage = "Something went wrong. Please try again.",
}: Props) {
  return (
    <section class="w-full bg-dc-50 px-4 md:px-8 lg:px-16 py-8 ">
      <div class="w-full max-w-[1440px] mx-auto">
        <div class="relative bg-gradient-to-br from-primary-light via-primary-light to-primary-light/80 rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16 overflow-hidden">
          {/* Decorative background elements */}
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary-dark/5 rounded-full blur-3xl" />
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary-dark/5 rounded-full blur-3xl" />

          {/* Content */}
          <div class="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Title */}
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
              {title}
            </h2>

            {/* Description */}
            <p class="text-base md:text-lg text-primary-dark/80 mb-8 max-w-2xl">
              {description}
            </p>

            {/* Form */}
            <SendFormNewsletter
              actionUrl={actionUrl}
              inputPlaceholder={inputPlaceholder}
              buttonText={buttonText}
              term={term}
              successMessage={successMessage}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
