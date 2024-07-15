import Byline from './item/components/Byline';
import { fetchTopStories } from './lib/API';

import './styles/home.css';

export default async function Home() {
  const topStories = await fetchTopStories(50);

  return (
    <div>
      <ol id="stories-list">
        {topStories.map((story) => (
          <li key={story.id} id={String(story.id)}>
            <a href={story.url}>{story.title ?? ''}</a>
            <Byline item={story} score author timestamp comments />
          </li>
        ))}
      </ol>
    </div>
  );
}
