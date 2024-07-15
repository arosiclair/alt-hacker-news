import Byline from './item/components/Byline';
import ItemLink from './item/components/ItemLink';
import { fetchTopStories } from './lib/API';

import './styles/home.css';

export default async function Home() {
  const topStories = await fetchTopStories(50);

  return (
    <div>
      <ol id="stories-list">
        {topStories.map((story) => (
          <li key={story.id} id={String(story.id)}>
            <ItemLink id={story.id}>{story.title ?? ''}</ItemLink>
            <Byline item={story} score author timestamp comments />
          </li>
        ))}
      </ol>
    </div>
  );
}
