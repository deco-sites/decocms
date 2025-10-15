import { useState } from "preact/hooks";
import { invoke } from "../runtime.ts";

export interface FormField {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "number" | "textarea" | "checkbox" | "select" | "multiselect";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  multiple?: boolean;
  showIfChecked?: string;
}

export interface Props {
  buttonText?: string;
  buttonClassName?: string;
  modalTitle?: string;
  formFields?: FormField[];
  submitButtonText?: string;
  successMessage?: string;
}

export default function FormModal({
  buttonText = "Open Form",
  buttonClassName = "",
  modalTitle = "Get in Touch",
  formFields = [
    { label: "Nome", name: "name", type: "text", required: true, placeholder: "Seu nome completo" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "seu@email.com" },
    { label: "Número", name: "phone", type: "tel", required: true, placeholder: "+55 (11) 99999-9999" },
    { label: "Empresa", name: "company", type: "text", required: true, placeholder: "Nome da empresa" },
    { label: "Cargo", name: "position", type: "text", required: true, placeholder: "Seu cargo" },
    { 
      label: "Pretende participar em qual dia?", 
      name: "participation_days", 
      type: "multiselect", 
      required: true,
      options: ["31/10", "01/11"]
    },
    { label: "Possui time?", name: "has_team", type: "checkbox" },
    { 
      label: "Tamanho do time",
      name: "team_size",
      type: "number",
      placeholder: "Ex: 4",
      showIfChecked: "has_team"
    },
    { 
      label: "Nome e e-mail dos membros", 
      name: "team_members", 
      type: "textarea", 
      placeholder: "Nome 1: email1@example.com\nNome 2: email2@example.com",
      showIfChecked: "has_team"
    },
    { label: "Observação", name: "observation", type: "textarea", placeholder: "Alguma observação adicional..." },
  ],
  submitButtonText = "Enviar",
  successMessage = "Obrigado! Entraremos em contato em breve.",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>({});
  const [multiSelectStates, setMultiSelectStates] = useState<Record<string, string[]>>({});

  const handleCheckboxChange = (fieldName: string, checked: boolean) => {
    setCheckboxStates(prev => ({ ...prev, [fieldName]: checked }));
  };

  const handleMultiSelectChange = (fieldName: string, option: string, checked: boolean) => {
    setMultiSelectStates(prev => {
      const current = prev[fieldName] || [];
      if (checked) {
        return { ...prev, [fieldName]: [...current, option] };
      } else {
        return { ...prev, [fieldName]: current.filter(o => o !== option) };
      }
    });
  };

  const shouldShowField = (field: FormField) => {
    if (!field.showIfChecked) return true;
    return checkboxStates[field.showIfChecked] === true;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data: Record<string, string | string[]> = {};
      
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      Object.keys(multiSelectStates).forEach(key => {
        const values = multiSelectStates[key];
        if (values && values.length > 0) {
          data[key] = values.join(", ");
        }
      });

      formFields.forEach(field => {
        if (field.type === "checkbox" && !data[field.name]) {
          data[field.name] = "false";
        }
      });

      const response = await invoke["site/actions/airtable/createRecord"](data);
      
      if (response && response.error) {
        setError(response.error);
        return;
      }
      
      if (response && (response.status === 200 || response.status === 201)) {
        setSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
          setSuccess(false);
          setCheckboxStates({});
          setMultiSelectStates({});
          (e.target as HTMLFormElement).reset();
        }, 2500);
      } else {
        setError(`Erro ao enviar formulário (Status: ${response?.status || 'desconhecido'})`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSuccess(false);
    setError(null);
    setCheckboxStates({});
    setMultiSelectStates({});
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        class={buttonClassName}
        type="button"
      >
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
            style={{ maxWidth: "420px", maxHeight: "calc(100vh - 200px)", alignSelf: "flex-start" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div class="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 class="text-lg font-semibold text-gray-900">
                {modalTitle}
              </h2>
              <button
                onClick={handleClose}
                type="button"
                class="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Fechar modal"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto px-6 py-5" style={{ overflowY: "auto" }}>
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
                    Fechando automaticamente...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} class="space-y-5">
                  {formFields.map((field, index) => {
                    const isVisible = shouldShowField(field);
                    if (!isVisible) return null;

                    return (
                      <div key={index} style={{ marginBottom: "20px" }}>
                        {field.type === "checkbox" ? (
                          <div class="flex items-start gap-3">
                            <input
                              type="checkbox"
                              name={field.name}
                              id={field.name}
                              value="true"
                              onChange={(e) => handleCheckboxChange(field.name, (e.target as HTMLInputElement).checked)}
                              class="mt-1 w-4 h-4 text-primary-dark border-gray-300 rounded focus:ring-2 focus:ring-primary-dark"
                            />
                            <label htmlFor={field.name} class="text-sm font-medium text-gray-700 cursor-pointer">
                              {field.label}
                              {field.required && <span class="text-red-500 ml-1">*</span>}
                            </label>
                          </div>
                        ) : field.type === "multiselect" ? (
                          <>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                              {field.label}
                              {field.required && <span class="text-red-500 ml-1">*</span>}
                            </label>
                            <div class="space-y-2 border border-gray-300 rounded-lg p-3">
                              {field.options?.map((option, optionIndex) => (
                                <div key={optionIndex} class="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={`${field.name}-${optionIndex}`}
                                    onChange={(e) => handleMultiSelectChange(
                                      field.name, 
                                      option, 
                                      (e.target as HTMLInputElement).checked
                                    )}
                                    class="w-4 h-4 text-primary-dark border-gray-300 rounded focus:ring-2 focus:ring-primary-dark"
                                  />
                                  <label 
                                    htmlFor={`${field.name}-${optionIndex}`}
                                    class="text-sm text-gray-700 cursor-pointer"
                                  >
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                              {field.label}
                              {field.required && <span class="text-red-500 ml-1">*</span>}
                            </label>
                            {field.type === "textarea" ? (
                              <textarea
                                name={field.name}
                                required={field.required}
                                placeholder={field.placeholder}
                                rows={3}
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent resize-none text-sm"
                              />
                            ) : field.type === "select" ? (
                              <select
                                name={field.name}
                                required={field.required}
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent text-sm"
                              >
                                <option value="">Selecione uma opção</option>
                                {field.options?.map((option, optionIndex) => (
                                  <option key={optionIndex} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={field.type}
                                name={field.name}
                                required={field.required}
                                placeholder={field.placeholder}
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent text-sm"
                              />
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}

                  {error && (
                    <div class="p-3 bg-red-50 border border-red-200 rounded-lg" style={{ marginTop: "20px" }}>
                      <p class="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    class="w-full px-6 py-3 bg-primary-dark text-primary-light rounded-lg font-semibold hover:bg-primary-dark/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base"
                    style={{ marginTop: "24px" }}
                  >
                    {isSubmitting ? "Enviando..." : submitButtonText}
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