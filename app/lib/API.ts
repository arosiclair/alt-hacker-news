import { HNItem } from '../types/hacker-news';

export async function fetchItem(id: string | number) {
  return fetchJSON(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  ) as Promise<HNItem | null>;
}

export async function fetchItems(ids: string[] | number[]) {
  return Promise.all(ids.map((id) => fetchItem(id))).then(
    (items) => items.filter((item) => item && !item.deleted) as HNItem[],
  );
}

export async function fetchTopStories(limit: number) {
  const topStoryIDs = await fetchTopStoryIDs();
  return fetchItems(topStoryIDs.slice(0, limit));
}

async function fetchTopStoryIDs() {
  return fetchJSON(
    'https://hacker-news.firebaseio.com/v0/topstories.json',
  ) as Promise<number[]>;
}

async function fetchJSON(url: string): Promise<unknown> {
  const response = await fetch(url);
  return response.json();
}
