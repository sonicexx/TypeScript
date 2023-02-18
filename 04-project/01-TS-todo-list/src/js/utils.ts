export function findParentNode(
  target: HTMLElement,
  className: string
): HTMLElement | undefined {
  while ((target = target.parentNode as HTMLElement)) {
    if (target.className === className) return target;
  }
}

export function createItem(
  tagName: string,
  className: string,
  todoItem: string
): HTMLElement {
  const oItem = document.createElement(tagName);
  oItem.className = className;
  oItem.innerHTML = todoItem;

  return oItem;
}
