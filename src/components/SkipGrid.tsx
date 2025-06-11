import React from 'react';
import {
    Grid,
    Box,
    CircularProgress,
    Alert,
    Typography,
} from '@mui/material';
import { SkipCard } from './SkipCard';
import type { Skip } from '../types/skip';

interface SkipGridProps {
    skips: Skip[];
    loading: boolean;
    error: string | null;
    handleSkipSelect: (skip: Skip) => void;
}

export const SkipGrid: React.FC<SkipGridProps> = ({
    skips,
    loading,
    error,
    handleSkipSelect,
}) => {
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <>
            {skips && skips.length > 0 ? (
                <Grid container spacing={3} justifyContent="center">
                    {skips.map((skip) => (
                        <Grid
                            component="div"
                            key={skip.id}
                            sx={{
                                width: {
                                    xs: '100%',
                                    sm: '50%',
                                    md: '33.33%',
                                    lg: '25%'
                                }
                            }}
                        >
                            <SkipCard skip={skip} onSelect={handleSkipSelect} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h6" align="center" mt={4}>
                    No skips available for this location.
                </Typography>
            )}
        </>
    );
}; 