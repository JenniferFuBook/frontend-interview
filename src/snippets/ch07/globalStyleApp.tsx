// Illustrative global-style pattern (listing 7.6). Not wired into the Vite
// companion app — shown for reference only.
import GlobalStyle from './globalStyles';
import BlogPostApp from './BlogPostApp';

const App = () => {
  return (
    <>
      <GlobalStyle /> {/* Inject global styles into the DOM. */}
      <BlogPostApp /> {/* Render the main application beneath the global styles. */}
    </>
  );
};

export default App;
