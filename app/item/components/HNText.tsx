type HNTextProps = {
  children?: string;
};

export default function HNText({ children }: HNTextProps) {
  // No idea if HN sanitizes their text (YOLO). Hopefully CORS saves us if anything
  const text = children ?? '';
  return <div dangerouslySetInnerHTML={{ __html: '<p>' + text }}></div>;
}
