export default function({ query, enablePreview }) {
  // if query params
  if (
    query.preview ||
    query["x-craft-live-preview"] ||
    query["x-craft-preview"]
  ) {
    enablePreview();
  }
}
