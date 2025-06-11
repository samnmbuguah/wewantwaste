import React from 'react';
import { Typography, Box } from '@mui/material';

export const SkipSelectionHeader: React.FC = () => {
    return (
        <Box sx={{ pb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Choose Your Skip Size
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
                Select the skip size that best suits your needs
            </Typography>
        </Box>
    );
}; 