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
    selectedSkip: Skip;
    calculateTotalPrice: (skip: Skip) => number;
    setSelectedSkip: (skip: Skip | null) => void;
    onContinue: () => void;
}

export const SkipSummary: React.FC<SkipSummaryProps> = ({
    selectedSkip,
    calculateTotalPrice,
    setSelectedSkip,
    onContinue
}) => {
    const theme = useTheme();
    const totalPrice = calculateTotalPrice(selectedSkip);

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
            <Box
                sx={{
                    maxWidth: '1600px',
                    mx: 'auto',
                    px: { xs: 2, sm: 4, md: 6, lg: 8 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}
            >
                <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block' }}>
                    Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                            {selectedSkip.size} Yard Skip
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            £{totalPrice.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {selectedSkip.hire_period_days} day hire
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button
                            variant="outlined"
                            onClick={() => setSelectedSkip(null)}
                            sx={{
                                bgcolor: 'background.paper',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'action.hover'
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
                </Box>
            </Box>
        </Paper>
    );
}; 