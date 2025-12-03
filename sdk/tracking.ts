/**
 * PostHog tracking helper
 * Centralizes tracking logic to avoid code duplication
 */
export function trackEvent(
  event: string,
  properties?: Record<string, unknown>,
) {
  try {
    const ph = (globalThis as typeof globalThis & { posthog?: any }).posthog;
    if (ph && typeof ph.capture === "function") {
      ph.capture(event, properties);
    }
  } catch {
    // swallow errors – never break UX
  }
}
