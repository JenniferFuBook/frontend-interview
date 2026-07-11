type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success'; data: string[] };
type ErrorState   = { status: 'error';   message: string };

type FetchState = LoadingState | SuccessState | ErrorState;

function render(state: FetchState): string {
  switch (state.status) {
    case 'loading': return 'Loading…';
    case 'success': return state.data.join(', ');
    case 'error':   return `Error: ${state.message}`;
    default: {
      // Exhaustiveness check: adding a new state fails compilation here.
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}

console.log(render({ status: 'loading' })); // Loading…
console.log(render({ status: 'success', data: ['one', 'two'] })); // one, two
console.log(render({ status: 'error', message: 'timeout' })); // Error: timeout

export {}; // Keep this file a module so its declarations stay local.
