import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    useTheme,
    Stack
} from '@mui/material';
import type { Skip } from '../types/skip';

interface SkipSummaryProps {
    selectedSkip: Skip | null;
    onContinue: () => void;
    onBack: () => void;
}

export const SkipSummary: React.FC<SkipSummaryProps> = ({
    selectedSkip,
    onContinue,
    onBack
}) => {
    const theme = useTheme();

    if (!selectedSkip) return null;

    return (
        <Paper
            elevation={0}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                bgcolor: 'background.paper',
                borderTop: `1px solid ${theme.palette.divider}`,
                zIndex: 1000
            }}
        >
            <Box sx={{ 
                maxWidth: '1200px',
                mx: 'auto',
                px: { xs: 2, sm: 3, md: 4 }
            }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Selected Skip: {selectedSkip.size} Yard
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {selectedSkip.description}
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            onClick={onBack}
                            sx={{
                                borderColor: theme.palette.divider,
                                color: theme.palette.text.primary,
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                }
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            onClick={onContinue}
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.dark'
                                }
                            }}
                        >
                            Continue
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    );
}; 