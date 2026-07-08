import { useState } from 'react';
import Tooltip from '../components/tooltip/Tooltip';

interface Fruit {
  id: number;
  name: string;
  price: number;
}

// Track the hovered fruit and its anchor element for tooltip positioning.
type ActiveTooltip = {
  id: number;
  element: HTMLElement;
};

const TooltipExample = () => {
  const [fruits] = useState<Fruit[]>([
    { id: 1, name: 'Apple', price: 2.5 },
    { id: 2, name: 'Banana', price: 1.99 },
    { id: 3, name: 'Blueberry', price: 4 },
  ]);

  const [activeTooltip, setActiveTooltip] = useState<ActiveTooltip | null>(
    null
  );

  return (
    <div>
      <h1>Fruit Catalog</h1>
      <ul>
        {fruits.map(({ id, name, price }) => (
          <li key={id}>
            <span
              // Capture the hovered element in state; the event target is the anchor.
              onMouseEnter={(e) =>
                setActiveTooltip({ id, element: e.currentTarget })
              }
              onMouseLeave={() => setActiveTooltip(null)}
              // In a real-world component, a CSS file should be used instead of inline styles
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {name}
            </span>
            {activeTooltip?.id === id && (
              <Tooltip
                text={`Price: $${price.toFixed(2)}`}
                // Pass a fresh ref object each render — intentional, so the
                // tooltip's layout effect re-measures against the current anchor.
                ref={{ current: activeTooltip.element }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TooltipExample;
