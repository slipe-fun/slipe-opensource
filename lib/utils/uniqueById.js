export default function GetUniqueById(array, raw) {
  const seenIds = new Set();
  return array
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
}
