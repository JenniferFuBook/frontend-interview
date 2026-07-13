// Illustrative SSR pattern (listing 7.8) for a framework such as Next.js.
// A client-only Vite app renders no server HTML, so it does not need this —
// shown for reference only.
import { ColorSchemeScript } from '@mantine/core';

const Document = () => (
  <html lang="en">
    <head>
      {/* Apply the saved color scheme before hydration to prevent the flash
          of the wrong theme on first paint. */}
      <ColorSchemeScript defaultColorScheme="auto" />
    </head>
    <body>{/* application */}</body>
  </html>
);

export default Document;
