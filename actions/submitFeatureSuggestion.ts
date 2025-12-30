interface Props {
  title: string;
  description: string;
  email?: string;
}

interface SubmitResponse {
  success: boolean;
  featureId?: number;
  error?: string;
}

/**
 * @title Submit Feature Suggestion
 * @description Create a new feature suggestion in the roadmap database
 */
export default async function submitFeatureSuggestion(
  { title, description, email }: Props,
  _req: Request
): Promise<SubmitResponse> {
  try {
    console.log(`💡 [ACTION] Submitting feature suggestion: ${title}`);

    const token = Deno.env.get("DECO_CHAT_TOKEN");

    if (!token) {
      console.error("❌ [ACTION] Missing DECO_CHAT_TOKEN");
      return {
        success: false,
        error: "Server configuration error. Please try again later.",
      };
    }

    // Build SQL INSERT query
    const sql = `
      INSERT INTO roadmap_suggestions (title, description, email, created_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      RETURNING id
    `;

    const requestBody = {
      method: "tools/call",
      params: {
        name: "DATABASES_RUN_SQL",
        arguments: {
          sql,
          params: [title, description, email || null],
        },
      },
      jsonrpc: "2.0",
      id: 1,
    };

    const response = await fetch(
      "https://api.decocms.com/deco-team/decocms/mcp/tool/DATABASES_RUN_SQL",
      {
        method: "POST",
        headers: {
          Accept: "application/json,text/event-stream",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      console.error(`❌ [ACTION] API error: ${response.status} ${response.statusText}`);
      return {
        success: false,
        error: `Failed to submit feature request. Please try again.`,
      };
    }

    const contentType = response.headers.get("content-type") || "";

    let result;
    if (contentType.includes("text/event-stream")) {
      // Handle Server-Sent Events response
      const text = await response.text();
      console.log("🔍 [ACTION] SSE Response:", text);

      // Parse SSE format to extract JSON data
      const lines = text.split("\n");
      let jsonData = null;

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const dataContent = line.substring(6); // Remove 'data: ' prefix
            if (dataContent.trim() && dataContent !== "[DONE]") {
              jsonData = JSON.parse(dataContent);
              break;
            }
          } catch (_e) {
            console.log("🔍 [ACTION] Failed to parse line:", line);
          }
        }
      }

      if (!jsonData) {
        return {
          success: false,
          error: "Failed to process server response",
        };
      }

      result = jsonData?.result?.structuredContent?.result?.[0];
    } else {
      // Handle regular JSON response
      const responseData = await response.json();
      result = responseData?.result?.structuredContent?.result?.[0];
    }

    // Check if insert was successful
    const insertedId = result?.results?.[0]?.id;

    if (insertedId) {
      console.log(`✅ [ACTION] Feature created with ID: ${insertedId}`);
      return {
        success: true,
        featureId: insertedId,
      };
    }

    console.log(`✅ [ACTION] Feature suggestion submitted successfully`);
    return {
      success: true,
    };
  } catch (error) {
    console.error(`❌ [ACTION] Error submitting feature:`, error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
