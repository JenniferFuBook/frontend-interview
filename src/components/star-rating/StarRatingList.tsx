import { Star } from './Star';
import './index.css';

type StarRatingListProps = {
  numOfStars: number;
  rating: number; // current rating, exposed as the slider's aria-valuenow
  activeIndex: number; // index (inclusive) to highlight; -1 if none
  activeColor: string;
  inactiveColor: string;
  starSize: string;
  hoverIndex: number
  onHover: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLeave: () => void;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};

export const StarRatingList = ({
  numOfStars,
  rating,
  activeIndex,
  activeColor,
  inactiveColor,
  starSize,
  hoverIndex,
  onHover,
  onLeave,
  onClick,
  onKeyDown,
}: StarRatingListProps) => {
  return (
    <div
      className="star-list-container"
      role="slider" // Expose the whole star list as one slider whose value is the rating.
      tabIndex={0} // Focusable so keyboard users can adjust the rating.
      aria-label="Star rating"
      aria-valuemin={0}
      aria-valuemax={numOfStars}
      aria-valuenow={rating > 0 ? rating : 0} // Report the current rating as the slider value.
      aria-valuetext={rating > 0 ? `${rating} of ${numOfStars} stars` : 'Not rated'}
      onMouseMove={onHover} // Use onMouseMove to track hover over stars
      onMouseLeave={onLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {/* Generate an array of stars based on numOfStars */}
      {Array.from({ length: numOfStars }).map((_, i) => {
        const startIndex = i + 1; // 1-based index for stars
        return (
          <Star
            key={i}
            index={startIndex} // Star position in the list
            fill={
              startIndex <= Math.floor(activeIndex)
                ? 1
                : startIndex - 0.5 === activeIndex
                ? 0.5
                : 0
            }
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            starSize={starSize}
            hoverIndex={hoverIndex}
          />
        );
      })}
    </div>
  );
};
