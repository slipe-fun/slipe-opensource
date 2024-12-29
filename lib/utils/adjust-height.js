export default function AdjustHeight(element, minHeight = "48px") {
    element.style.height = minHeight;
    element.style.height = `${Math.max(element.scrollHeight, parseInt(minHeight))}px`;
}
