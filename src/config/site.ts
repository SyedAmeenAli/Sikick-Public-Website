/**
 * External Sikick service links — configured by environment, never hardcoded
 * into flows. The public site does not implement auth, billing, email or
 * calendar itself; it links out to the deployed IMS console / POS terminal
 * or to explicitly configured endpoints. When an endpoint is unset, the UI
 * shows an honest "not yet configured" state instead of faking success.
 */

const env = import.meta.env;

const trimSlash = (value: string): string => value.replace(/\/+$/, '');

/** Public URL of this website (canonical, OG, sitemap). */
export const SITE_URL = trimSlash(env.VITE_SITE_URL ?? 'http://localhost:5173');

/** Deployed Sikick IMS console. */
export const SIKICK_APP_URL = trimSlash(
  env.VITE_SIKICK_APP_URL ?? 'https://ims-web-902186518684.asia-south2.run.app',
);

/**
 * "Log in" destination — the IMS console's dashboard route renders its own
 * sign-in gate (OwnerGate) when no session exists. We link to /dashboard
 * explicitly so a visitor always lands on the auth screen, not a marketing
 * homepage or the app root.
 */
export const SIKICK_LOGIN_URL = trimSlash(
  env.VITE_SIKICK_LOGIN_URL ?? `${SIKICK_APP_URL}/dashboard`,
);

/** "Start a 14-day trial" destination — the IMS signup flow. */
export const SIKICK_TRIAL_URL = trimSlash(env.VITE_SIKICK_TRIAL_URL ?? `${SIKICK_APP_URL}/signup`);

/** Password reset destination. */
export const SIKICK_RESET_PASSWORD_URL = trimSlash(
  env.VITE_SIKICK_RESET_PASSWORD_URL ?? `${SIKICK_APP_URL}/reset-password`,
);

/** Deployed POS terminal (separate deployment). */
export const SIKICK_POS_URL = trimSlash(
  env.VITE_SIKICK_POS_URL ?? 'https://pos-web-902186518684.asia-south2.run.app',
);

/** Optional POST endpoint for the Enterprise quote form. Empty = not configured. */
export const QUOTE_ENDPOINT: string | null = env.VITE_SIKICK_QUOTE_ENDPOINT?.trim() || null;

/** Optional POST endpoint for blueprint email delivery. Empty = not configured. */
export const EMAIL_ENDPOINT: string | null = env.VITE_SIKICK_EMAIL_ENDPOINT?.trim() || null;

/** Optional public calendar-booking link offered after a quote request. */
export const CALENDAR_URL: string | null = env.VITE_SIKICK_CALENDAR_URL?.trim() || null;

/** Optional support email displayed on the contact page. Empty = not configured. */
export const SUPPORT_EMAIL: string | null = env.VITE_SIKICK_SUPPORT_EMAIL?.trim() || null;

/** Optional support phone displayed on the contact page. Empty = not configured. */
export const SUPPORT_PHONE: string | null = env.VITE_SIKICK_SUPPORT_PHONE?.trim() || null;

export const trialUrlWithPlan = (plan?: string): string =>
  plan ? `${SIKICK_TRIAL_URL}?plan=${encodeURIComponent(plan)}` : SIKICK_TRIAL_URL;
