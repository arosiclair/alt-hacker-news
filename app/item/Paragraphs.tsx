type ParagraphsProps = {
  rawText: string;
};

export default function Paragraphs({ rawText }: ParagraphsProps) {
  const paragraphs = rawText.split('<p>');
  return paragraphs.map((text, index) => <p key={index}>{text}</p>);
}
