import { useState } from "preact/hooks";
import { invoke } from "../runtime.ts";

export interface Props {
  buttonText?: string;
  buttonClassName?: string;
  modalTitle?: string;
  successMessage?: string;
}

export default function SuggestFeatureModal({
  buttonText = "Submit Feature Request",
  buttonClassName = "inline-flex items-center gap-2 px-6 py-3 bg-primary-dark text-primary-light font-medium rounded-lg hover:bg-primary-dark/90 transition-colors",
  modalTitle = "Request a Feature",
  successMessage = "Thank you! Your feature request has been submitted successfully.",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const title = formData.get("title")?.toString() || "";
      const description = formData.get("description")?.toString() || "";
      const email = formData.get("email")?.toString() || "";

      // Chama a tool SUBMIT_FEATURE_SUGGESTION que salva na database
      const response = await invoke["site/actions/submitFeatureSuggestion"]({
        title,
        description,
        email,
      });

      if (response && response.success) {
        setSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
          setSuccess(false);
          (e.target as HTMLFormElement).reset();
        }, 2500);
      } else {
        setError(response?.error || "Failed to submit feature request");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSuccess(false);
    setError(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        class={buttonClassName}
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        {buttonText}
      </button>

      {isOpen && (
        <div
          class="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          style={{ padding: "100px 32px 100px 32px" }}
          onClick={handleClose}
        >
          <div
            class="bg-white rounded-2xl shadow-2xl w-full mx-auto flex flex-col animate-in zoom-in-95 duration-200"
            style={{ maxWidth: "500px", maxHeight: "calc(100vh - 200px)", alignSelf: "flex-start" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div class="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 class="text-lg font-semibold text-gray-900">
                {modalTitle}
              </h2>
              <button
                onClick={handleClose}
                type="button"
                class="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div class="flex-1 overflow-y-auto px-6 py-5">
              {success ? (
                <div class="text-center py-8">
                  <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="text-base font-medium text-gray-900 mb-2">
                    {successMessage}
                  </p>
                  <p class="text-sm text-gray-600">
                    Closing automatically...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} class="space-y-5">
                  {/* Title */}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Feature Title <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="Brief title for your feature"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Description <span class="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      required
                      placeholder="Describe your feature request in detail"
                      rows={5}
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent resize-none text-sm"
                    />
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Your Email (optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="We'll notify you of updates"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent text-sm"
                    />
                  </div>

                  {error && (
                    <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p class="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    class="w-full px-6 py-3 bg-primary-dark text-primary-light rounded-lg font-semibold hover:bg-primary-dark/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
