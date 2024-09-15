import { HNItem } from '../types/hacker-news';

export function proxyItems(itemIDs: string[] | number[]) {
  return postJSON('/api/items', { itemIDs }) as Promise<HNItem[]>;
}

async function postJSON(url: string, body: Record<string, unknown>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}
