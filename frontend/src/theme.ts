import { createTheme, MantineThemeOverride, NavLink } from '@mantine/core';

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
    NavLink: {
      styles: (theme: MantineThemeOverride) => ({
        label: {
          fontSize: 16
        }
      })
    }
  },
});
