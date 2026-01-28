type HighlightTextProps = {
  text: string;
  highlight: string;
  className?: string;
};

const HighlightText = ({ text, highlight, className }: HighlightTextProps) => {
  const parts = text.split(highlight);

  if (parts.length < 2) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {parts[0]}
      <span className="font-bold">{highlight}</span>
      {parts[1]}
    </p>
  );
};

export default HighlightText;
