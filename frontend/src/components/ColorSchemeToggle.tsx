import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react';
import { Center, MantineColorScheme, SegmentedControl } from '@mantine/core';

export function ColorSchemeToggle({
  value,
  handleColorSchemeChanged,
}: {
  value: string;
  handleColorSchemeChanged: (value: MantineColorScheme) => void;
}) {
  return (
    <SegmentedControl
      withItemsBorders={false}
      radius="xl"
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
      value={value}
      onChange={(v) => handleColorSchemeChanged(v as MantineColorScheme)}
    />
  );
}
