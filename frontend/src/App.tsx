import './App.module.css';

import '@mantine/core/styles.css';

import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import AppContent from './pages/AppContent.page';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </MantineProvider>
  );
}
