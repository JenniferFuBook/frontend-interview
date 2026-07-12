import '@mantine/core/styles.css';
import {
  MantineProvider,
  useMantineColorScheme,
  Button,
} from '@mantine/core';
import AppLayout from '../components/mantine-theme/AppLayout';

const ThemeToggle = () => {
  // Provide the current color scheme and a toggle function
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Button onClick={toggleColorScheme}>
      {colorScheme === 'dark' ? 'Switch to light' : 'Switch to dark'}
    </Button>
  );
};

const MantineThemeExample = () => (
  // defaultColorScheme="auto" seeds from the saved preference or the system
  // preference; Mantine persists changes to localStorage automatically
  <MantineProvider defaultColorScheme="auto">
    <ThemeToggle />
    <AppLayout />
  </MantineProvider>
);

export default MantineThemeExample;
