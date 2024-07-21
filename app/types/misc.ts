export type PageProps = {
  params: { slug: string };
  searchParams?: PageSearchParams;
};

export type PageSearchParams = { [key: string]: string | string[] | undefined };
