import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { SkipSelection } from './pages/SkipSelection';
import { PermitCheck } from './pages/PermitCheck';
import { WasteTypeSelection } from './pages/WasteTypeSelection';
import React, { useState } from 'react';
import type { Skip } from './types/skip';

enum AppSteps {
  WasteType = 'waste-type',
  SelectSkip = 'select-skip',
  PermitCheck = 'permit-check',
  // Add more steps as needed
}

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
  const [currentStep, setCurrentStep] = useState<AppSteps>(AppSteps.WasteType);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);

  const handleWasteTypeContinue = (wasteTypes: string[]) => {
    setSelectedWasteTypes(wasteTypes);
    setCurrentStep(AppSteps.SelectSkip);
  };

  const handleWasteTypeBack = () => {
    // No back action from WasteType for now, maybe to Postcode step later
  };

  const handleSelectSkipContinue = (skip: Skip) => {
    setSelectedSkip(skip);
    setCurrentStep(AppSteps.PermitCheck);
  };

  const handleSelectSkipBack = () => {
    setSelectedSkip(null);
    setCurrentStep(AppSteps.WasteType);
  };

  const handlePermitCheckContinue = (location: 'private' | 'public') => {
    console.log('Permit check location:', location);
    // TODO: Navigate to the next step (Choose Date)
  };

  const handlePermitCheckBack = () => {
    setCurrentStep(AppSteps.SelectSkip);
  };

  const renderStep = () => {
    switch (currentStep) {
      case AppSteps.WasteType:
        return (
          <WasteTypeSelection
            onBack={handleWasteTypeBack}
            onContinue={handleWasteTypeContinue}
          />
        );
      case AppSteps.SelectSkip:
        return (
          <SkipSelection
            selectedSkip={selectedSkip}
            setSelectedSkip={setSelectedSkip}
            onContinue={handleSelectSkipContinue}
            onBack={handleSelectSkipBack}
          />
        );
      case AppSteps.PermitCheck:
        return (
          selectedSkip ? (
            <PermitCheck
              selectedSkip={selectedSkip}
              onBack={handlePermitCheckBack}
              onContinue={handlePermitCheckContinue}
            />
          ) : (
            <WasteTypeSelection
              onBack={handleWasteTypeBack}
              onContinue={handleWasteTypeContinue}
            />
          )
        );
      default:
        return (
          <WasteTypeSelection
            onBack={handleWasteTypeBack}
            onContinue={handleWasteTypeContinue}
          />
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>{globalStyles}</style>
      {renderStep()}
    </ThemeProvider>
  );
}

export default App;
