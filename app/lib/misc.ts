export function getItemURL(itemID: number) {
  return `/item?id=${itemID}`;
}

export function stripHTML(value: string, replaceValue = ''): string {
  return value.replace(/<[^>]*>?/gm, replaceValue);
}

export function getHostname(urlString: string) {
  if (!urlString) return null;

  let url;
  try {
    url = new URL(urlString);
  } catch {
    return null;
  }

  return url.hostname;
}
