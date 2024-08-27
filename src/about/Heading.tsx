export function Heading({ level, text }: { level: 1 | 2; text: string }) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const className = level === 1 ? "text-5xl mb-8" : "text-3xl";
  return <Tag className={className}>{text}</Tag>;
}
