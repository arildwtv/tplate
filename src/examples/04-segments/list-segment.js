export default function listSegment(items) {
  return ({ t }) => t(
    items.map((item, index) => `${index + 1}) ${item}`)
  );
}
