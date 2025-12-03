import { invoke } from "../runtime.ts";
import Icon from "../components/ui/Icon.tsx";
import { useState } from "preact/hooks";

export interface Props {
  actionUrl?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  term?: string;
  successMessage?: string;
}

export default function SendFormNewsletter(
  { actionUrl, inputPlaceholder, buttonText, term, successMessage }: Props,
) {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await invoke.site.actions.resend.createContact({
      email: formData.get("email") as string,
    });
    console.log(response);
    if (response.status === 200 || response.status === 201) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <p class="text-sm text-primary-dark/60 mt-4 text-center">
        {successMessage}
      </p>
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
          placeholder={inputPlaceholder}
          class="w-full pl-8 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl outline outline-1 outline-offset-[-1px] outline-primary-dark/20 text-primary-dark placeholder:text-primary-dark/40 text-base font-normal focus:outline-2 focus:outline-primary-dark transition-all"
        />

        {/* Submit Button */}
        <button
          type="submit"
          class="px-8 py-4 bg-primary-dark text-primary-light rounded-xl font-semibold text-base hover:bg-primary-dark/90 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {buttonText}
          <Icon name="arrow_forward" class="w-5 h-5" />
        </button>
      </div>

      {/* Privacy notice */}
      <p class="text-sm text-primary-dark/60 mt-4 text-center">
        {term}
      </p>
    </form>
  );
}
