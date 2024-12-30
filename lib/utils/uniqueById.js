export default function GetUniqueById(array, raw, page) {
  const seenIds = new Set();

  const uniqueArray = array
    .slice()
    .reverse()
    .filter(item => {
      if (seenIds.has(item.id)) {
        return false;
      }
      seenIds.add(item.id);
      return true;
    })
    .reverse();

  const pageSize = 12;
  const pages = [];
  for (let i = 0; i < uniqueArray.length; i += pageSize) {
    pages.push(uniqueArray.slice(i, i + pageSize));
  }

  const targetIndex = page - 1;
  if (targetIndex >= 0 && targetIndex < pages.length) {
    const chunk = pages[targetIndex];
    const rawIds = new Set(raw.map(item => item.id));

    pages[targetIndex] = chunk.filter(item => rawIds.has(item.id));
  }

  return pages.flat();
}
