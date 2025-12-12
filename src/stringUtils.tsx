export function renderDescription(desc: string)
{
  return desc
    .split(/(\*\*.+?\*\*|\n)/)
    .map((part, i) =>
    {
      if (part === "\n") return <br key={i} />;
      if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
      return part;
    });
}
