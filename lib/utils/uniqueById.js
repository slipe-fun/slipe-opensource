export default function GetUniqueById(array) {
  const seenIds = new Set();
  return array
    .filter(Boolean)
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
