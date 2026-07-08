// Traverse the DOM upward from the event target to find the nearest star wrapper.
export const findStarElement = (target: EventTarget) => {
  // Event targets are not guaranteed to be DOM elements (e.g. text nodes or window).
  if (!(target instanceof Element)) {
    return null;
  }

  // Use closest() to walk up the tree — the pointer may land on a child span inside the star.
  return target.closest('[data-star-index]') as HTMLElement | null;
};

// Compute the new rating from a click or hover event's position within the star.
export const calculateNewRating = (e: React.MouseEvent) => {
  // Resolve the star element the event originated from.
  const el = findStarElement(e.target);
  if (!el) {
    return;
  }

  // Measure the star's bounding box to determine left/right halves.
  const { left, width } = el.getBoundingClientRect();

  // Calculate offset from the star's left edge to determine which half the pointer is in.
  const offsetX = e.clientX - left;

  // Select a half-star rating for the left half; a full star for the right half.
  const isHalf = offsetX < width / 2;

  // Read the 1-based star index stored in the data attribute by StarRatingList.
  const idx = Number(el.dataset.starIndex);

  return isHalf ? idx - 0.5 : idx;
};
