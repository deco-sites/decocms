import { AppContext } from "../../apps/site.ts";

export interface Props {
  [key: string]: string | string[] | undefined;
}

export default async function createAirtableRecord(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  // Tentar múltiplas fontes para a API key
  let apiKey: string | undefined;

  // 1. Tentar do contexto (Secret ou string)
  if (typeof ctx.airtableApiKey === "string") {
    apiKey = ctx.airtableApiKey;
  } else {
    apiKey = await ctx.airtableApiKey.get?.();
  }

  if (!apiKey) {
    return {
      status: 400,
      error:
        "Missing AIRTABLE_API_KEY env var. Por favor, configure as credenciais do Airtable no Admin.",
    };
  }

  const baseId = ctx.airtableBaseId;
  if (!baseId) {
    return {
      status: 400,
      error:
        "Missing AIRTABLE_BASE_ID env var. Por favor, configure as credenciais do Airtable no Admin.",
    };
  }

  const tableId = ctx.airtableTableId;
  if (!tableId) {
    return {
      status: 400,
      error:
        "Missing AIRTABLE_TABLE_ID env var. Por favor, configure as credenciais do Airtable no Admin.",
    };
  }

  // Prepare fields for Airtable
  const fields: Record<string, string | boolean | string[] | number> = {};

  Object.keys(props).forEach((key) => {
    const value = props[key];

    if (value !== undefined && value !== null && value !== "") {
      // Convert "true"/"false" strings to boolean for checkbox fields
      if (value === "true") {
        fields[key] = true;
      } else if (value === "false") {
        fields[key] = false;
      } else if (key === "Tamanho do time" && !isNaN(Number(value))) {
        // Convert to number for numeric fields
        fields[key] = Number(value);
      } else if (key === "Dia de participação" && typeof value === "string") {
        // Convert string to array for Multiple Select field
        // Se tem vírgula, split. Se não, cria array com único valor
        if (value.includes(",")) {
          fields[key] = value.split(",").map((v) => v.trim());
        } else {
          fields[key] = [value.trim()];
        }
      } else {
        // Keep as string
        fields[key] = value as string;
      }
    }
  });

  console.log("Sending to Airtable:", {
    baseId,
    tableId,
    fields,
    hasApiKey: !!apiKey,
  });

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: fields,
        }),
      },
    );

    if (!response.ok) {
      let errorMessage = "";
      const contentType = response.headers.get("content-type");

      try {
        if (contentType?.includes("application/json")) {
          const errorJson = await response.json();
          errorMessage = errorJson.error?.message || errorJson.error?.type ||
            JSON.stringify(errorJson);
        } else {
          errorMessage = await response.text();
        }
      } catch {
        errorMessage = response.statusText;
      }

      console.error("Airtable error:", {
        status: response.status,
        message: errorMessage,
        contentType,
        sentFields: fields,
      });

      return {
        status: response.status,
        error:
          `Erro ao enviar para Airtable (${response.status}): ${errorMessage}`,
      };
    }

    const result = await response.json();
    console.log("Airtable success:", result);

    return { response: result, status: response.status };
  } catch (error) {
    console.error("Error sending to Airtable:", error);
    return {
      status: 500,
      error: error instanceof Error
        ? error.message
        : "Erro desconhecido ao enviar dados",
    };
  }
}
