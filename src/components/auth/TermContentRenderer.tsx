type Props = {
  content: string;
};

// 라인 타입 정의
type LineType = "title" | "subtitle" | "bullet" | "text" | "empty" | "numberText";

function classifyLine(line: string): LineType {
  const trimmed = line.trim();

  if (trimmed.length === 0) return "empty";

  // [Case 1]
  if (/^제\s?\d+\s?조/.test(trimmed)) {
    return "title";
  }
  // [Case 2]
  if (/^\d+\.\s/.test(trimmed)) {
    const isLongSentence = trimmed.length > 14;
    const endsWithDot = trimmed.endsWith(".");

    if (isLongSentence || endsWithDot) {
      return "numberText";
    }
    return "subtitle";
  }
  // [Case 3]
  if (/^[-•*]\s?/.test(trimmed)) {
    return "bullet";
  }
  // [Case 4]
  return "text";
}

export default function TermContentRenderer({ content }: Props) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");

  return (
    <div className="flex flex-col">
      {lines.map((rawLine, idx) => {
        const type = classifyLine(rawLine);
        const line = rawLine.trim();

        if (type === "empty") return null; 
  
        if (type === "title") {
          return (
            <div key={idx} className="mt-[24px] mb-[8px] text-[14px] font-semibold text-gray-700">
              {line}
            </div>
          );
        }

        if (type === "subtitle") {
          return (
            <div key={idx} className="mt-[24px] mb-[8px] text-[14px] font-semibold text-gray-700">
              {line}
            </div>
          );
        }

        if (type === "numberText") {
          const match = line.match(/^(\d+\.)\s+(.*)/);
          const numberPart = match ? match[1] : "";
          const textPart = match ? match[2] : line;

          return (
            <div key={idx} className="flex items-start mb-1 pl-1">
              <span className="mr-2 text-[14px] leading-[22px] text-gray-700 flex-shrink-0">
                {numberPart}
              </span>
              <p className="text-[14px] leading-[22px] font-regular text-gray-700 flex-1 whitespace-pre-wrap">
                {textPart}
              </p>
            </div>
          );
        }

        if (type === "bullet") {
          const cleanText = line.replace(/^[-•*]\s?/, ""); 
          return (
            <div key={idx} className="flex items-start pl-1">
              <span className="mr-2 mt-[9px] block h-1 w-1 rounded-full bg-gray-700 flex-shrink-0" />
              <p className="text-[14px] leading-[22px] font-regular text-gray-700 flex-1 whitespace-pre-wrap">
                {cleanText}
              </p>
            </div>
          );
        }

        return (
          <div key={idx} className="text-[14px] leading-[22px] font-regular text-gray-700 whitespace-pre-wrap">
            {line}
          </div>
        );
      })}
    </div>
  );
}