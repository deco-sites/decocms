import type { AppContext } from "../apps/site.ts";

interface Props {
  title: string;
  description: string;
  email?: string;
}

interface SubmitResponse {
  success: boolean;
  featureId?: string;
  error?: string;
}

/**
 * @title Submit Feature Suggestion
 * @description Create a new feature suggestion in the Airtable roadmap
 */
export default async function submitFeatureSuggestion(
  { title, description, email }: Props,
  req: Request,
  ctx: AppContext
): Promise<SubmitResponse> {
  try {
    console.log(`💡 [ACTION] Submitting feature to Airtable: ${title}`);
    
    // Read credentials from AppContext (same pattern as createRecord.ts)
    let apiKey: string | undefined;
    
    if (typeof ctx.airtableApiKey === 'string') {
      apiKey = ctx.airtableApiKey;
    } else {
      apiKey = await ctx.airtableApiKey?.get?.();
    }
    
    const baseId = ctx.airtableBaseId;
    
    console.log('🔍 [ACTION] API Key:', apiKey ? 'found' : 'missing');
    console.log('🔍 [ACTION] Base ID:', baseId ? 'found' : 'missing');
    
    if (!apiKey) {
      console.error('❌ [ACTION] Missing AIRTABLE_API_KEY');
      return { 
        success: false, 
        error: 'Missing AIRTABLE_API_KEY. Please configure Airtable credentials in Admin.' 
      };
    }
    
    if (!baseId) {
      console.error('❌ [ACTION] Missing AIRTABLE_BASE_ID');
      return { 
        success: false, 
        error: 'Missing AIRTABLE_BASE_ID. Please configure Airtable credentials in Admin.' 
      };
    }
    
    console.log('✅ [ACTION] Credentials loaded, calling Airtable...');
    
    // Create record in Airtable (using 'Requests' table - case sensitive!)
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/Requests`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'Title': title,
            'Description': description,
            'Email': email || '',
            'Created': new Date().toISOString()
          }
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ [ACTION] Airtable API error:`, response.status, errorText);
      return { 
        success: false, 
        error: `Airtable error: ${response.status}` 
      };
    }
    
    const result = await response.json();
    console.log(`✅ [ACTION] Feature created in Airtable:`, result.id);
    
    return {
      success: true,
      featureId: result.id
    };
  } catch (error) {
    console.error(`❌ [ACTION] Error submitting feature:`, error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
