import { Star } from './Star';
import './index.css';

type StarRatingListProps = {
  numOfStars: number;
  rating: number; // current rating, exposed as the slider's aria-valuenow
  activeIndex: number; // index (inclusive) to highlight; -1 if none
  activeColor: string;
  inactiveColor: string;
  starSize: string;
  hoverIndex: number;
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
      aria-valuetext={rating > 0 ? `${rating} of ${numOfStars} stars` : 'Not rated'} // Announce a friendly value.
      onMouseMove={onHover} // Use onMouseMove on the container (not onMouseEnter per star) to track sub-star pointer position for half-star detection.
      onMouseLeave={onLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {/* Render one Star per slot; compute fill from the active highlight range. */}
      {Array.from({ length: numOfStars }).map((_, i) => {
        const startIndex = i + 1; // Convert 0-based map index to 1-based star index.
        return (
          <Star
            key={i}
            index={startIndex}
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
