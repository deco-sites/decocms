export interface FormField {
  /** @title Field Label */
  label: string;
  /** @title Field Type */
  type: "text" | "email" | "textarea" | "select" | "checkbox";
  /** @title Field Name */
  name: string;
  /** @title Required */
  required?: boolean;
  /** @title Placeholder */
  placeholder?: string;
  /** @title Options (for select) */
  options?: string[];
}

export interface Props {
  /** @title Section Title */
  title?: string;
  /** @title Form Fields */
  formFields?: FormField[];
  /** @title Submit Button Text */
  submitButtonText?: string;
  /** @title Form Action URL */
  formActionUrl?: string;
}

export default function ApplicationForm({
  title = "Application (fields)",
  formFields = [
    {
      label: "Company name",
      type: "text",
      name: "company_name",
      required: true,
      placeholder: "Your company name",
    },
    {
      label: "Company website",
      type: "text",
      name: "company_website",
      required: true,
      placeholder: "https://yourcompany.com",
    },
    {
      label: "HQ country",
      type: "text",
      name: "hq_country",
      required: true,
      placeholder: "United States",
    },
    {
      label: "Partner type",
      type: "select",
      name: "partner_type",
      required: true,
      options: ["SI/Agency", "ISV", "Tech", "Training"],
    },
    {
      label: "Headcount",
      type: "text",
      name: "headcount",
      required: true,
      placeholder: "e.g., 10-50",
    },
    {
      label: "# AI practitioners",
      type: "text",
      name: "ai_practitioners",
      required: true,
      placeholder: "e.g., 5",
    },
    {
      label: "Stacks",
      type: "textarea",
      name: "stacks",
      required: true,
      placeholder: "HubSpot, WhatsApp, AWS/Azure/GCP, Snowflake/BigQuery, etc.",
    },
    {
      label: "Focus verticals & geos",
      type: "textarea",
      name: "focus_verticals",
      required: true,
      placeholder: "E-commerce, Healthcare, North America, Europe, etc.",
    },
    {
      label: "References (2 links) or public work",
      type: "textarea",
      name: "references",
      required: true,
      placeholder: "Link 1: https://...\nLink 2: https://...",
    },
    {
      label: "Preferred monetization",
      type: "select",
      name: "monetization",
      required: true,
      options: ["Referral", "Reseller", "Services", "ISV"],
    },
    {
      label: "Primary contact name",
      type: "text",
      name: "contact_name",
      required: true,
      placeholder: "John Doe",
    },
    {
      label: "Primary contact email",
      type: "email",
      name: "contact_email",
      required: true,
      placeholder: "john@company.com",
    },
    {
      label: "WhatsApp number",
      type: "text",
      name: "whatsapp",
      placeholder: "+1234567890",
    },
    {
      label: "Why Deco?",
      type: "textarea",
      name: "why_deco",
      required: true,
      placeholder:
        "Tell us why you want to partner with Deco (short paragraph)",
    },
    {
      label: "I agree to the Terms & Conditions",
      type: "checkbox",
      name: "agree_terms",
      required: true,
    },
  ],
  submitButtonText = "Start application",
  formActionUrl = "/partners/apply",
}: Props) {
  return (
    <section class="w-full bg-[#FAF9F7] py-16 md:py-24">
      <div class="w-full max-w-[800px] mx-auto px-4 md:px-8">
        <div class="flex flex-col gap-8 md:gap-12">
          {/* Header */}
          <h2 class="text-[#1C1917] text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
            {title}
          </h2>

          {/* Form */}
          <form
            action={formActionUrl}
            method="POST"
            class="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-dc-200"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map((field, index) => (
                <div
                  key={index}
                  class={field.type === "textarea" ||
                      field.name === "why_deco" ||
                      field.name === "references" || field.name === "stacks" ||
                      field.name === "focus_verticals"
                    ? "md:col-span-2"
                    : ""}
                >
                  <label class="block text-[#1C1917] text-sm font-medium mb-2">
                    {field.label}
                    {field.required && <span class="text-red-500 ml-1">*</span>}
                  </label>

                  {field.type === "text" || field.type === "email"
                    ? (
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        placeholder={field.placeholder}
                        class="w-full px-3 py-2 border border-dc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0EC1A] focus:border-transparent"
                      />
                    )
                    : field.type === "textarea"
                    ? (
                      <textarea
                        name={field.name}
                        required={field.required}
                        placeholder={field.placeholder}
                        rows={4}
                        class="w-full px-3 py-2 border border-dc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0EC1A] focus:border-transparent resize-vertical"
                      />
                    )
                    : field.type === "select"
                    ? (
                      <select
                        name={field.name}
                        required={field.required}
                        class="w-full px-3 py-2 border border-dc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0EC1A] focus:border-transparent"
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )
                    : field.type === "checkbox"
                    ? (
                      <div class="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name={field.name}
                          required={field.required}
                          class="w-4 h-4 text-[#D0EC1A] border-dc-300 rounded focus:ring-[#D0EC1A]"
                        />
                        <span class="text-[#78716C] text-sm">
                          I agree to the Terms & Conditions
                        </span>
                      </div>
                    )
                    : null}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div class="mt-8 flex justify-center">
              <button
                type="submit"
                class="px-8 py-3 bg-[#D0EC1A] rounded-xl text-[#07401A] text-base font-medium hover:bg-[#C5E015] transition-colors"
              >
                {submitButtonText} →
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
