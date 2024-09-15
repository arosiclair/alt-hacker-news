import { fetchItems } from '@/app/lib/API';

type RequestBody = {
  itemIDs?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json()) as RequestBody;

  if (!body.itemIDs) {
    return Response.json({ error: 'itemIDs missing' }, { status: 400 });
  }

  if (!Array.isArray(body.itemIDs)) {
    return Response.json(
      { error: 'itemIDs should be a string array' },
      { status: 400 },
    );
  }

  // Normalize itemIDs to a string array
  const itemIDs = body.itemIDs.filter(Boolean).map((itemID) => String(itemID));
  const items = await fetchItems(itemIDs);
  return Response.json(items);
}
