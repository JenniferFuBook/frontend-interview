type StarProps = {
  index: number;
  fill: 0 | 0.5 | 1; // 0 = empty, 0.5 = half, 1 = full
  activeColor: string;
  inactiveColor: string;
  starSize: string;
  hoverIndex: number;
};

export const Star = ({
  index,
  fill,
  activeColor,
  inactiveColor,
  starSize,
  hoverIndex,
}: StarProps) => {
  return (
    <span // Position the inactive and active layers on top of each other to create the layered star effect.
      // Apply the bounce animation only to the star currently under the cursor.
      className={
        hoverIndex === index || hoverIndex === index - 0.5 ? 'bounce' : ''
      }
      data-star-index={index} // Pass the star index to calculateNewRating via data attribute.
      style={{
        position: 'relative',
        display: 'inline-block',
        // Apply a uniform size to layout dimensions and the Unicode star character.
        width: starSize,
        height: starSize,
        fontSize: starSize,
        lineHeight: 1,
        cursor: 'pointer', // Signal that the star is clickable.
      }}
      role="radio" // Treat this star as a radio button within the radiogroup.
      aria-label={`Rate ${index}${fill === 0.5 ? ' and a half' : ''} stars`} // Announce the star index and half-star state to screen readers.
      aria-checked={fill > 0} // Mark the star as selected when it carries any fill.
      tabIndex={0} // Include in the tab order for keyboard navigation.
    >
      {/* Render the background star in inactive color — always visible beneath the active layer. */}
      <span
        style={{
          color: inactiveColor,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        aria-hidden="true" // Hide from screen readers — the accessible label is on the parent span.
      >
        ★
      </span>

      {/* Render the foreground star clipped to 0%, 50%, or 100% fill. */}
      <span
        style={{
          color: activeColor,
          position: 'absolute',
          top: 0,
          left: 0,
          width: fill === 1 ? '100%' : fill === 0.5 ? '50%' : '0%',
          height: '100%',
          overflow: 'hidden',
          // Animate width changes so half-star fills interpolate smoothly.
          transition: 'width 0.2s ease-in-out',
        }}
        aria-hidden="true"
      >
        ★
      </span>
    </span>
  );
};
