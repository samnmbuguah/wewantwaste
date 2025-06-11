import React from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    useTheme,
} from '@mui/material';
import type { Skip } from '../types/skip';

interface SkipSummaryProps {
    selectedSkip: Skip;
    calculateTotalPrice: (skip: Skip) => number;
    setSelectedSkip: (skip: Skip | null) => void;
}

export const SkipSummary: React.FC<SkipSummaryProps> = ({
    selectedSkip,
    calculateTotalPrice,
    setSelectedSkip,
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`,
                p: 2,
                animation: 'slideUp 0.3s ease-out',
                zIndex: 50,
            }}
        >
            <Box sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
                <Typography mb={1} variant="caption" color="text.secondary" align="center" sx={{ display: 'block' }}>
                    Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
                </Typography>
                <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="medium">{selectedSkip.size} Yard Skip</Typography>
                        <Box>
                            <Typography variant="h6" component="span" fontWeight="bold" color={theme.palette.primary.main}>£{calculateTotalPrice(selectedSkip).toFixed(2)}</Typography>
                            <Typography variant="body2" component="span" color="text.secondary" ml={1}>{selectedSkip.hire_period_days} days</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid component="div" sx={{ width: '50%' }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => setSelectedSkip(null)}
                                sx={{ mr: 1 }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid component="div" sx={{ width: '50%' }}>
                            <Button variant="contained" fullWidth>
                                Continue
                            </Button>
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{ display: { xs: 'none', lg: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="medium">{selectedSkip.size} Yard Skip</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" component="span" fontWeight="bold" color={theme.palette.primary.main}>£{calculateTotalPrice(selectedSkip).toFixed(2)}</Typography>
                        <Typography variant="body2" component="span" color="text.secondary" ml={1}>{selectedSkip.hire_period_days} days</Typography>
                        <Button
                            variant="outlined"
                            onClick={() => setSelectedSkip(null)}
                            sx={{ ml: 4, mr: 1 }}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained">
                            Continue
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}; 