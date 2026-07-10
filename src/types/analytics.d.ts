declare global {
  interface Window {
    analytics: {
      track(event: string, properties?: Record<string, unknown>): void;
    };
  }
}

export {}; // Make this file a module so `declare global` augments correctly.
