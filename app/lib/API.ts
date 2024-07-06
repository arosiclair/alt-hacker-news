import { HNItem } from '../types/hacker-news';

export async function fetchItem(id: string | number) {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  );
  return (await response.json()) as HNItem;
}

export async function fetchItems(ids: string[] | number[]) {
  return Promise.all(ids.map((id) => fetchItem(id)));
}
