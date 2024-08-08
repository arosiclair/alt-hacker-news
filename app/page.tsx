import Byline from './item/components/Byline';
import ItemLink from './item/components/ItemLink';
import { fetchTopStories } from './lib/API';
import { getHostname } from './lib/misc';
import { HNItem } from './types/hacker-news';

import './styles/home.css';

export default async function Home() {
  const topStories = await fetchTopStories(50);

  return (
    <div>
      <ol id="stories-list">
        {topStories.map((story) => {
          const id = String(story.id);
          const url = story.url ?? '';
          const hostname = `(${getHostname(url) ?? 'self'})`;

          return (
            <li key={id} id={id}>
              <StoryLink story={story} />{' '}
              {hostname && <span className="muted">{hostname}</span>}
              <Byline item={story} score author timestamp comments />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

type StoryLinkProps = {
  story: HNItem;
};

function StoryLink({ story }: StoryLinkProps) {
  const url = story.url ?? '';
  const title = story.title ?? '';

  if (url) {
    return <a href={url}>{title}</a>;
  }

  // If there's no URL it's a self post so just link to the item
  return <ItemLink id={story.id}>{title}</ItemLink>;
}
