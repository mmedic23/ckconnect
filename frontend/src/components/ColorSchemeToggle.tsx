import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react';
import { Center, MantineColorScheme, SegmentedControl } from '@mantine/core';

export function ColorSchemeToggle({
  handleColorSchemeChanged,
}: {
  handleColorSchemeChanged: (value: MantineColorScheme) => void;
}) {
  return (
    <SegmentedControl
      withItemsBorders={false}
      radius="xl"
      ml="auto"
      data={[
        {
          label: (
            <Center>
              <IconSunMoon />
            </Center>
          ),
          value: 'auto',
        },
        {
          label: (
            <Center>
              <IconMoon />
            </Center>
          ),
          value: 'dark',
        },
        {
          label: (
            <Center>
              <IconSun />
            </Center>
          ),
          value: 'light',
        },
      ]}
      onChange={(value) => handleColorSchemeChanged(value as MantineColorScheme)}
    />
  );
}
