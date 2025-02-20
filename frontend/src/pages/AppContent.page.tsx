import { IconBrandMantine, IconLine, IconMapPin2, IconRoute2 } from '@tabler/icons-react';
import { Route, Link as RouterLink, NavLink as RouterNavLink, Routes } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle';
import { HomePage } from './Home.page';
import { Locations } from './Locations.page';
import { RouteSearch } from './Routes.page';
import { Transportations } from './Transportations.page';

export default function AppContent() {
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'md', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconBrandMantine size={30} />
          <Title className="title" ta="center">
            <Text inherit variant="gradient" gradient={{ from: 'pink', to: 'yellow' }}>
              <RouterLink to="/" style={{ textDecoration: 'none' }}>
                CKCONNECT
              </RouterLink>
            </Text>
          </Title>
          <ColorSchemeToggle handleColorSchemeChanged={setColorScheme} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          component={RouterNavLink}
          to="/locations"
          label="Locations"
          leftSection={<IconMapPin2 />}
        />
        <NavLink
          component={RouterNavLink}
          to="/transportations"
          label="Transportations"
          leftSection={<IconLine />}
        />
        <NavLink
          component={RouterNavLink}
          to="/routes"
          label="Routes"
          leftSection={<IconRoute2 />}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/transportations" element={<Transportations />} />
          <Route path="/routes" element={<RouteSearch />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}
