// Minimal logger used by formatDate (listing 7.10) to demonstrate testing a
// side effect independently of a return value.
export const logger = {
  log: (message: string): void => {
    console.log(message);
  },
};
