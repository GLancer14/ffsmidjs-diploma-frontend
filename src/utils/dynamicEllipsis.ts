export function applyDynamicEllipsis(element: HTMLElement, lineHeight = 1.5) {
  const container = element.parentElement;
  if (container) {
    const containerHeight = container.clientHeight;
    const computedStyle = window.getComputedStyle(element);
    // const lineHeight = parseFloat(computedStyle.lineHeight);
    const fontSize = parseFloat(computedStyle.fontSize);

    const maxLines = Math.floor(containerHeight / (fontSize * lineHeight));
    if (maxLines > 0) {
      element.style.webkitLineClamp = String(maxLines);
      element.style.display = "-webkit-box";
      element.style.webkitBoxOrient = "vertical";
    }
  }
}