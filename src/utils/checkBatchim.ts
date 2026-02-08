export const hasBatchim = (word: string): boolean => {
  if (!word) return false;

  const lastChar = word.charCodeAt(word.length - 1);
  if (lastChar < 0xac00 || lastChar > 0xd7a3) return false;

  return (lastChar - 0xac00) % 28 !== 0;
};
