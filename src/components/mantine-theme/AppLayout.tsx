import { Title, Text, Button, Stack, Container } from '@mantine/core';

const AppLayout = () => (
  <Container mt="md">
    <Stack>
      <Title order={3}>Theme Switcher</Title>
      <Title order={4}>Welcome</Title>
      <Text>
        Toggle between light and dark themes using Mantine&apos;s{' '}
        <code>MantineProvider</code>.
      </Text>
      <Button variant="default">Learn More</Button>
    </Stack>
  </Container>
);

export default AppLayout;
