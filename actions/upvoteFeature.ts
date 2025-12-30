interface Props {
  featureId: number;
  /** @default "upvote" */
  action?: "upvote" | "downvote";
}

interface UpvoteResponse {
  success: boolean;
  upvotes?: number;
  featureId: number;
  error?: string;
}

/**
 * @title Upvote Feature
 * @description Increment or decrement the upvote count for a feature in the roadmap
 */
export default async function upvoteFeature(
  { featureId, action = "upvote" }: Props,
  _req: Request
): Promise<UpvoteResponse> {
  try {
    const isUpvote = action === "upvote";
    console.log(`🗳️ [ACTION] ${isUpvote ? "Upvoting" : "Removing vote from"} feature: ${featureId}`);

    const token = Deno.env.get("DECO_CHAT_TOKEN");

    if (!token) {
      console.error("❌ [ACTION] Missing DECO_CHAT_TOKEN");
      return {
        success: false,
        error: "Server configuration error. Please try again later.",
        featureId,
      };
    }

    // Build SQL UPDATE query to increment or decrement upvotes
    const sql = isUpvote
      ? `
        UPDATE roadmap_features 
        SET upvotes = upvotes + 1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING id, upvotes
      `
      : `
        UPDATE roadmap_features 
        SET upvotes = CASE WHEN upvotes > 0 THEN upvotes - 1 ELSE 0 END, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING id, upvotes
      `;

    const requestBody = {
      method: "tools/call",
      params: {
        name: "DATABASES_RUN_SQL",
        arguments: {
          sql,
          params: [featureId],
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
        error: "Failed to upvote. Please try again.",
        featureId,
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
            const dataContent = line.substring(6);
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
          featureId,
        };
      }

      result = jsonData?.result?.structuredContent?.result?.[0];
    } else {
      // Handle regular JSON response
      const responseData = await response.json();
      result = responseData?.result?.structuredContent?.result?.[0];
    }

    // Get the updated upvotes count
    const updatedRow = result?.results?.[0];
    const newUpvotes = updatedRow?.upvotes;

    if (newUpvotes !== undefined) {
      console.log(`✅ [ACTION] Feature ${featureId} now has ${newUpvotes} upvotes`);
      return {
        success: true,
        upvotes: newUpvotes,
        featureId,
      };
    }

    console.log(`✅ [ACTION] Upvote submitted successfully`);
    return {
      success: true,
      featureId,
    };
  } catch (error) {
    console.error(`❌ [ACTION] Error upvoting feature:`, error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      featureId,
    };
  }
}
