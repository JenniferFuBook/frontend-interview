/**
 * Post/Redirect/Get: a minimal Express server that answers a POST with a 303
 * redirect, so refreshing the confirmation re-issues a safe GET instead of
 * resubmitting the form.
 * Run command: node src/snippets/ch04/postRedirectGet.js
 */
import express from 'express';

const app = express();

// Parse incoming form data.
app.use(express.urlencoded({ extended: true }));

// Serve the initial form page.
app.get('/form', (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required />
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle the POST, which changes state.
app.post('/submit', (req, res) => {
  // Process and persist the data here.
  console.log('Data saved:', req.body.username);

  // Redirect with 303 to a safe GET route.
  res.redirect(303, '/confirmation');

  // Render the confirmation straight from the POST handler (no redirect).
  // The page is now the POST response, so a refresh re-sends the POST.
  //  res.send('<h1>Success! Your data has been saved.</h1>');
});

// Serve the confirmation page over GET.
app.get('/confirmation', (req, res) => {
  res.send('<h1>Success! Your data has been saved.</h1>');
});

app.listen(3000, () => console.log('Server running on port 3000'));
