export function getItemURL(itemID: number) {
  return `/item?id=${itemID}`;
}

export function stripHTML(value: string, replaceValue = ''): string {
  return value.replace(/<[^>]*>?/gm, replaceValue);
}
