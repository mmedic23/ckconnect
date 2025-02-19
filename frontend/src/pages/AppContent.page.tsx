import { IconBrandMantine, IconLine, IconMapPinFilled, IconRoute2 } from '@tabler/icons-react';
import { Route, NavLink as RouterNavLink, Routes } from 'react-router-dom';
import { AppShell, Burger, Group, NavLink, useMantineColorScheme } from '@mantine/core';
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
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconBrandMantine size={30} />
          <ColorSchemeToggle handleColorSchemeChanged={setColorScheme} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          component={RouterNavLink}
          to="/locations"
          label="Locations"
          leftSection={<IconMapPinFilled />}
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
