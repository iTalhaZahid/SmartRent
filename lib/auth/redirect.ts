const DEFAULT_REDIRECT = "/";

/** Accept only same-site relative paths; never forward auth redirects off-site. */
export function getSafeRedirectPath(value: string | null | undefined) {
  if (!value?.startsWith("/") || value.startsWith("//")) {
    return DEFAULT_REDIRECT;
  }

  return value;
}

export function getRequestOrigin(request: Request) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    try {
      return new URL(configuredUrl).origin;
    } catch {
      // Fall through to the trusted URL parsed by the runtime.
    }
  }

  return new URL(request.url).origin;
}
