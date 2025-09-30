import { AppProviders } from './providers';

/**
 * @component App
 * @summary The root component of the application that sets up all providers.
 * @domain core
 * @type ui-component
 * @category application-shell
 */
function App() {
  return <AppProviders />;
}

export default App;
