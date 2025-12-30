import { invoke } from "../runtime.ts";
import Icon from "../components/ui/Icon.tsx";
import { useState } from "preact/hooks";

export interface Props {
  actionUrl?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  term?: string;
  successMessage?: string;
  errorMessage?: string;
}

export default function SendFormNewsletter(
  { actionUrl, inputPlaceholder, buttonText, term, successMessage, errorMessage = "Something went wrong. Please try again." }: Props,
) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await invoke.site.actions.resend.createContact({
        email: formData.get("email") as string,
      });
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
      } else {
        setError(errorMessage);
      }
    } catch (err) {
      console.error(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div class="w-full max-w-xl animate-fade-in">
        <div class="flex flex-col items-center justify-center gap-4 py-6 px-8 bg-white/90 backdrop-blur-sm rounded-xl">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Icon name="check" class="w-8 h-8 text-green-600" />
          </div>
          <p class="text-lg font-semibold text-primary-dark text-center">
            {successMessage}
          </p>
          <p class="text-sm text-primary-dark/60 text-center">
            Check your inbox for updates and exclusive content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      action={actionUrl}
      method="POST"
      class="w-full max-w-xl"
      onSubmit={handleSubmit}
    >
      <div class="flex flex-col sm:flex-row gap-3 w-full">
        {/* Email Input */}
        <input
          type="email"
          name="email"
          required
          disabled={loading}
          placeholder={inputPlaceholder}
          class="w-full pl-8 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl outline outline-1 outline-offset-[-1px] outline-primary-dark/20 text-primary-dark placeholder:text-primary-dark/40 text-base font-normal focus:outline-2 focus:outline-primary-dark transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          class="px-8 py-4 bg-primary-dark text-primary-light rounded-xl font-semibold text-base hover:bg-primary-dark/90 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {loading ? (
            <>
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Subscribing...
            </>
          ) : (
            <>
              {buttonText}
              <Icon name="arrow_forward" class="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div class="mt-4 flex items-center justify-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl">
          <Icon name="error" class="w-5 h-5 flex-shrink-0" />
          <p class="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Privacy notice */}
      <p class="text-sm text-primary-dark/60 mt-4 text-center">
        {term}
      </p>
    </form>
  );
}
