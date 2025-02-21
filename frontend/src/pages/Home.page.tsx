import { Text, Title } from '@mantine/core';

export function HomePage() {
  return (
    <>
      <Title className="title" ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          CKCONNECT
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This responsive React SPA was built using Vite + Mantine. To get started, check out the navigation sidebar on the left.
      </Text>
    </>
  );
}
