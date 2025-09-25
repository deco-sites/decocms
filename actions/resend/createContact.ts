import { AppContext } from "../../apps/site.ts";

export interface Props {
  email: string;
  firstName?: string;
  lastName?: string;
  unsubscribed?: boolean;
  audienceId?: string;
}

export default async function createResendContact(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  if (!props?.email) {
    throw new Error("email is required");
  }

  const apiKey = ctx.env?.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY env var");
  }

  const audienceId = props.audienceId ?? ctx.env?.RESEND_DEFAULT_AUDIENCE_ID;
  if (!audienceId) {
    throw new Error(
      "audienceId is required (prop or RESEND_DEFAULT_AUDIENCE_ID env)",
    );
  }

  const response = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        first_name: props.firstName,
        last_name: props.lastName,
        unsubscribed: props.unsubscribed ?? false,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `Resend error ${response.status}: ${errorText || response.statusText}`,
    );
  }

  return await response.json();
}
