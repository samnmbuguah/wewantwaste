import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { SkipSelection } from './pages/SkipSelection';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0037C1',
    },
    background: {
      default: '#121212',
      paper: '#1C1C1C',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// Add global styles
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .btn-primary {
    background-color: #0037C1;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.2s;
  }

  .btn-primary:hover {
    background-color: #002da1;
  }

  .btn-secondary {
    background-color: #2A2A2A;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.2s;
  }

  .btn-secondary:hover {
    background-color: #3A3A3A;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .animate-slideUp {
    animation: slideUp 0.3s ease-out;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>{globalStyles}</style>
      <SkipSelection />
    </ThemeProvider>
  );
}

export default App;
