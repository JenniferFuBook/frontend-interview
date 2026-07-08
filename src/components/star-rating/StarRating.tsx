import { useRef, useState } from 'react';
import { StarRatingList } from './StarRatingList';
import { StarRatingLabel } from './StarRatingLabel';
import { calculateNewRating } from './utils';
import './index.css';

type StarRatingProps = {
  // 1-based rating; -1 means "not yet rated"
  defaultRating?: number;
  // Total number of stars to render (defaults to 5)
  numOfStars?: number;
  // Fill color for selected stars
  activeColor?: string;
  // Fill color for unselected stars
  inactiveColor?: string;
  // CSS size applied to width, height, and font-size (e.g. '24px', '1.5rem')
  starSize?: string;
  // Placeholder label text shown when no rating is selected
  text?: string;
  // Whether to render the text label beneath the stars
  showLabel?: boolean;
};

// Orchestrate click, hover, and keyboard state; delegate rendering to StarRatingList.
const StarRating = ({
  defaultRating = -1,
  numOfStars = 5,
  activeColor = 'orange',
  inactiveColor = 'gray',
  starSize = '40px',
  text = 'Not rated',
  showLabel = true,
}: StarRatingProps) => {
  // Persist the selected rating across re-renders.
  const [rating, setRating] = useState<number>(defaultRating);

  // Temporarily highlight stars under the cursor; reset to -1 on mouse leave.
  const [hoverIndex, setHoverIndex] = useState<number>(-1);

  // Reference the wrapper div to locate the rendered stars for keyboard focus control.
  const containerRef = useRef<HTMLDivElement>(null);

  // Highlight stars up to whichever index is higher — the hover preview or the saved rating.
  const activeUntil = Math.max(rating, hoverIndex);

  // Commit the clicked star's rating to state.
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Delegate index resolution to a utility that reads the data attribute from the DOM.
    const index = calculateNewRating(e);
    if (index !== undefined) {
      // Toggle to a half-star if the same star is clicked again.
      const newRating = index === rating ? index - 0.5 : index;
      setRating(newRating);
      setHoverIndex(-1); // Clear hover highlight after the click is committed.
    }
  };

  // Update the hover highlight as the pointer moves across stars.
  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    // Delegate index resolution to the same utility used by handleClick.
    const index = calculateNewRating(e);
    if (index !== undefined && index !== hoverIndex) {
      setHoverIndex(index);
    }
  };

  // Clear the hover highlight when the pointer exits the star list.
  const handleLeave = () => setHoverIndex(-1);

  // Allow arrow key navigation across stars for keyboard users.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Query all radio stars from the wrapper ref to programmatically move focus.
    const stars = containerRef.current?.querySelectorAll('[role="radio"]');
    if (!stars) {
      return;
    }

    if (e.key === 'ArrowRight') { // Step up by half a star; wrap back to 0 past the last star.
      const newRating = rating + 0.5 <= numOfStars ? rating + 0.5 : 0;
      setRating(newRating);
      (stars[Math.ceil(newRating) - 1] as HTMLElement).focus();
    } else if (e.key === 'ArrowLeft') { // Step down by half a star; wrap to the last star below 0.
      const newRating = rating - 0.5 >= 0 ? rating - 0.5 : numOfStars;
      setRating(newRating);
      (stars[Math.ceil(newRating) - 1] as HTMLElement).focus();
    }
  };

  // Show "Rated N" once a rating is selected; fall back to the placeholder text.
  const label = rating > 0 ? `Rated ${rating}` : text;

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Render the star list via StarRatingList. */}
      <StarRatingList
        numOfStars={numOfStars}
        activeUntil={activeUntil}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
        starSize={starSize}
        hoverIndex={hoverIndex}
        onHover={handleHover}
        onLeave={handleLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
      {/* Render the label below the stars when showLabel is true. */}
      {showLabel && <StarRatingLabel text={label} />}
    </div>
  );
};
export default StarRating;
