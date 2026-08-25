import { useState } from 'react';
import { StarRatingList } from './StarRatingList';
import { StarRatingLabel } from './StarRatingLabel';
import { calculateNewRating } from './utils';
import './index.css';

type StarRatingProps = {
  // Initial rating (1-based; -1 means "not rated")
  defaultRating?: number;
  // Number of stars to render (defaults to 5)
  numOfStars?: number;
  // Color of selected/active stars
  activeColor?: string;
  // Color of unselected/inactive stars
  inactiveColor?: string;
  // CSS size (e.g., '24px', '1.5rem')
  starSize?: string;
  // Optional custom label text. If omitted, a default label is generated
  text?: string;
  // Whether to show the text label beneath stars
  showLabel?: boolean;
};

// Main container component (logic layer)
const StarRating = ({
  defaultRating = -1,
  numOfStars = 5,
  activeColor = 'orange',
  inactiveColor = 'gray',
  starSize = '40px',
  text = 'Not rated',
  showLabel = true,
}: StarRatingProps) => {
  // Track the current rating (persistent after click)
  const [rating, setRating] = useState<number>(defaultRating);

  // Track the hover index (temporary, resets on mouse leave)
  const [hoverIndex, setHoverIndex] = useState<number>(-1);

  // Determine which stars should be highlighted by either rating or hover
  const activeIndex = Math.max(rating, hoverIndex);

  // Event handler for clicking a star
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Use a utility function to obtain the index of the clicked star
    const newRatingIndex = calculateNewRating(e);
    if (newRatingIndex !== undefined) {
      setRating(newRatingIndex === rating ? 0 : newRatingIndex); // Clear the rating when the same star is clicked again
      setHoverIndex(-1); // Reset hover state after the click
    }
  };

  // Event handler for hovering over a star
  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    // Use a utility function to obtain the index of the hovered star
    const newRatingIndex = calculateNewRating(e);
    // Optimize performance by triggering updates solely on changes
    if (newRatingIndex !== undefined && newRatingIndex !== hoverIndex) {
      setHoverIndex(newRatingIndex);
    }
  };

  // Reset hover state on leave
  const handleLeave = () => setHoverIndex(-1);

  // Let keyboard users adjust the rating with the arrow keys; the slider container holds focus.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setRating(Math.min(rating + 1, numOfStars)); // Step up by one star, clamped at the maximum.
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setRating(Math.max(rating - 1, 0)); // Step down by one star, clamped at zero.
    }
  };

  // Determine label text (either default text or "Rated X")
  const label = rating > 0 ? `Rated ${rating}` : text;

  return (
    <div className="container">
      {/* Star list (UI layer) */}
      <StarRatingList
        numOfStars={numOfStars}
        rating={rating}
        activeIndex={activeIndex}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
        starSize={starSize}
        onHover={handleHover}
        onLeave={handleLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
      {/* Optional label (UI layer) */}
      {showLabel && <StarRatingLabel text={label} />}
    </div>
  );
};
export default StarRating;
