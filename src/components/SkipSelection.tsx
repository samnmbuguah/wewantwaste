import React from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    useTheme,
} from '@mui/material';
import { SkipGrid } from './SkipGrid';
import type { Skip } from '../types/skip';
import { SkipDetails } from './SkipDetails';
import { SkipForm } from './SkipForm';

interface SkipSelectionProps {
    skips: Skip[];
    onSkipSelect: (skip: Skip) => void;
    selectedSkip: Skip | null;
    onContinue: () => void;
    onBack: () => void;
}

export const SkipSelection: React.FC<SkipSelectionProps> = ({
    skips,
    onSkipSelect,
    selectedSkip,
    onContinue,
    onBack,
}) => {
    const theme = useTheme();

    const handleSkipSelect = (skip: Skip) => {
        onSkipSelect(skip);
    };

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        textAlign: 'center',
                        mb: 2,
                        color: 'text.primary',
                    }}
                >
                    Select Your Skip Size
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        color: 'text.secondary',
                        maxWidth: '600px',
                        mx: 'auto',
                    }}
                >
                    Choose the skip size that best fits your needs. All skips come with a 14-day hire period.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <SkipGrid
                    skips={skips}
                    onSelectSkip={handleSkipSelect}
                    selectedSkip={selectedSkip}
                />

                {selectedSkip && (
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: 2,
                            bgcolor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <SkipDetails skip={selectedSkip} />
                        <Box sx={{ mt: 4 }}>
                            <SkipForm
                                skip={selectedSkip}
                                onContinue={onContinue}
                                onBack={onBack}
                            />
                        </Box>
                    </Paper>
                )}
            </Box>
        </Container>
    );
}; 