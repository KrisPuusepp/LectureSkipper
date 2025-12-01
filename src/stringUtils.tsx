export function renderDescription(desc: string)
{
  // Split on **bold**
  const parts = desc.split(/\*\*(.+?)\*\*/);

  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}
