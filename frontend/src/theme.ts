import { createTheme, MantineThemeOverride, TextInput } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'orange',
  components: {
    TextInput: {
      styles: (theme: MantineThemeOverride) => ({
        label: {
          marginBottom: '0.25rem', // Use 'md' or 'xl' from Mantine's spacing scale
        },
      }),
    },
  },
});
