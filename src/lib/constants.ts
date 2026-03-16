export const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL || "https://cdn.supremeanimation.com";

/**
 * Helper to get the full CDN URL for an asset
 */
export const getCdnUrl = (path: string) => {
  if (!path) return path;
  if (path.startsWith("http")) return path;
  
  // Remove '/portfolio' prefix if it exists
  let cleanPath = path;
  if (cleanPath.startsWith("/portfolio/")) {
    cleanPath = cleanPath.replace("/portfolio/", "/");
  } else if (cleanPath.startsWith("portfolio/")) {
    cleanPath = cleanPath.replace("portfolio/", "/");
  }

  // Ensure the path starts with a slash
  const normalizedPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  
  // URL encode the path (encodes spaces as %20 but keeps / untouched)
  const encodedPath = encodeURI(normalizedPath);
  
  // Ensure the base URL doesn't have a trailing slash
  const baseUrl = CDN_BASE_URL.endsWith("/")
    ? CDN_BASE_URL.slice(0, -1)
    : CDN_BASE_URL;
  
  return `${baseUrl}${encodedPath}`;
};
