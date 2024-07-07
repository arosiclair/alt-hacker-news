type ParagraphsProps = {
  rawText: string;
  noLastMargin?: boolean;
};

export default function Paragraphs({ rawText, noLastMargin }: ParagraphsProps) {
  const paragraphs = rawText.split('<p>');
  return paragraphs.map((text, index) => (
    <p
      key={index}
      style={
        noLastMargin && index === paragraphs.length - 1
          ? { marginBottom: 0 }
          : undefined
      }
    >
      {text}
    </p>
  ));
}
