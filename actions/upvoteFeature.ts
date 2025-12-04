import type { AppContext } from "../apps/site.ts";

export interface Props {
  featureId: number;
}

export default async function upvoteFeature(
  { featureId }: Props,
  req: Request,
  ctx: AppContext
) {
  console.log("🎯 [ACTION] upvoteFeature called with:", featureId);
  
  try {
    // Chama a tool via fetch (actions não tem ctx.env)
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    
    const response = await fetch(`${baseUrl}/live/invoke/i:tools-management/UPVOTE_FEATURE`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': req.headers.get('Cookie') || ''
      },
      body: JSON.stringify({ featureId })
    });
    
    const result = await response.json();
    console.log("✅ [ACTION] Upvote result:", JSON.stringify(result));
    
    return {
      success: true,
      upvotes: result.upvotes || 1,
      featureId
    };
  } catch (error) {
    console.error("❌ [ACTION ERROR]:", error);
    return {
      success: false,
      error: String(error),
      featureId
    };
  }
}
