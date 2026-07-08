import { Star } from './Star';
import './index.css';

type StarRatingListProps = {
  numOfStars: number;
  activeUntil: number; // index (inclusive) to highlight; -1 if none
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
  activeUntil,
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
      role="radiogroup" // Group the individual star radio buttons for screen readers.
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
              startIndex <= Math.floor(activeUntil)
                ? 1
                : startIndex - 0.5 === activeUntil
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
