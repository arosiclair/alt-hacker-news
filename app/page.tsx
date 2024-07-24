import Byline from './item/components/Byline';
import { fetchTopStories } from './lib/API';
import { getHostname } from './lib/misc';

import './styles/home.css';

export default async function Home() {
  const topStories = await fetchTopStories(50);

  return (
    <div>
      <ol id="stories-list">
        {topStories.map((story) => {
          const id = String(story.id);
          const url = story.url ?? '';
          const hostname = `(${getHostname(url)})`;

          return (
            <li key={id} id={id}>
              <a href={url}>{story.title ?? ''}</a>{' '}
              {hostname && <span className="muted">{hostname}</span>}
              <Byline item={story} score author timestamp comments />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
