export interface SqlLoaderProps {
    sql: string;
    params?: unknown[];
  }
  
  export interface SqlResponse {
    result?: {
      data?: unknown[];
      error?: string;
    };
    error?: {
      code: number;
      message: string;
    };
  }
  
  const listFeatures = async (
    _props: unknown,
    _req: Request
  ): Promise<SqlResponse> => {
    
    try {
  
      const requestBody = {
        method: "tools/call",
        params: {
          name: "INTEGRATIONS_CALL_TOOL",
          arguments: {
            id: "i:databases-management",
            params: {
              name: "DATABASES_RUN_SQL",
              arguments: {
                sql : "SELECT * FROM roadmap_features",
              }
            }
          }
        },
        jsonrpc: "2.0",
        id: 1
      };
  
      const response = await fetch(
        "https://api.decocms.com/deco-team/decocms/mcp/tool/INTEGRATIONS_CALL_TOOL",
        {
          method: "POST",
          headers: {
            "accept": "application/json, text/event-stream",
            "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Deno.env.get("DECO_CHAT_TOKEN")}`,
          },
          body: JSON.stringify(requestBody)
        }
      );

      console.log("🔍 [LOADER] Response status:", response.status);
      console.log("🔍 [LOADER] Response headers:", response.headers);

      if (!response.ok) {
        return {
          error: {
            code: response.status,
            message: `HTTP ${response.status}: ${response.statusText}`
          }
        };
      }

      const contentType = response.headers.get("content-type") || "";
      
      if (contentType.includes("text/event-stream")) {
        // Handle Server-Sent Events response
        const text = await response.text();
        console.log("🔍 [LOADER] SSE Response:", text);
        
        // Parse SSE format to extract JSON data
        const lines = text.split('\n');
        let jsonData = null;
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const dataContent = line.substring(6); // Remove 'data: ' prefix
              if (dataContent.trim() && dataContent !== '[DONE]') {
                jsonData = JSON.parse(dataContent);
                break;
              }
            } catch (_e) {
              console.log("🔍 [LOADER] Failed to parse line:", line);
            }
          }
        }
        
        return jsonData.result.structuredContent.structuredContent.result?.[0];
      } else {
        // Handle regular JSON response
        const responseData = await response.json();
        console.log("🔍 [LOADER] JSON Response:", responseData);
        return responseData.result.structuredContent;
      }
  
    } catch (error) {
      return {
        error: {
          code: 500,
          message: error instanceof Error ? error.message : "Unknown error occurred"
        }
      };
    }
  };
  
  export default listFeatures;
  