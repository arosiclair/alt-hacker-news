import { decode } from 'html-entities';

type HNTextProps = {
  text: string;
};

export default function HNText({ text }: HNTextProps) {
  // No idea if HN sanitizes their text (YOLO). Hopefully CORS saves us if anything
  return <div dangerouslySetInnerHTML={{ __html: decode('<p>' + text) }}></div>;
}
